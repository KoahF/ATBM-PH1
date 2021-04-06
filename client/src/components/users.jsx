import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
import _ from "lodash";

import { paginate } from "../utils/paginate";

import roleApi from "../api/roleAPI";
import userApi from "../api/userAPI";

import UsersTable from "./usersTable";

import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";

class Users extends Component {
    state = {
        currentPage: 1,
        pageSize: 10,
        sortColumn: { path: "_id", order: "asc" },
        searchQuery: "",
        users: [],
        roles: [],
        selectedRole: null,
    };

    async componentDidMount() {
        // const data = [
        // 	{ ROLE: 'Role hihi', ROLE_ID: '1' },
        // 	{ ROLE: 'Role haha', ROLE_ID: '2' },
        // ];

        // const users = [
        // 	{ role: { ROLE: 'Role haha', ROLE_ID: '2' }, USERNAME: 'huy', USER_ID: '2' },
        // 	{ role: { ROLE: 'Role hihi', ROLE_ID: '1' }, USERNAME: 'kim', USER_ID: '1' },
        // ];

        const [{ rows: data }, { rows: users }] = await Promise.all([
            roleApi.getAll(),
            userApi.getAll(),
        ]);

        const roles = [{ ROLE: "All Roles", ROLE_ID: "allRoles" }, ...data];

        this.setState({
            users,
            roles,
            selectedRole: roles[0],
        });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleDeleteUser = async (user) => {
        const originalUsers = this.state.users;

        const users = originalUsers.filter((u) => u.USER_ID !== user.USER_ID);

        this.setState({ users });

        // try {
        // 	await deleteUser(user._id);
        // } catch (ex) {
        // 	if (ex.response && ex.response.status === 404)
        // 		toast.error('This user has already been deleted');
        // 	this.setState({ users: originalUsers });
        // }
    };

    handleRoleSelect = (role) => {
        this.setState({ selectedRole: role, currentPage: 1 });
    };

    handleSort = (path) => {
        this.setState({ sortColumn: path });
    };

    getPageData = () => {
        const {
            pageSize,
            currentPage,
            users: allUsers,
            selectedRole,
            sortColumn,
            searchQuery,
        } = this.state;

        const filtered =
            selectedRole && selectedRole.ROLE_ID !== "allRoles"
                ? allUsers.filter(
                      (u) => u.role.ROLE_ID === selectedRole.ROLE_ID
                  )
                : allUsers;

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        if (searchQuery) {
            const regex = new RegExp(searchQuery, "i");
            const searched = sorted.filter((u) => regex.test(u.USERNAME));
            const users = paginate(searched, currentPage, pageSize);

            return { totalCount: searched.length, data: users };
        }

        const users = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: users };
    };

    handleSearch = (searchQuery) => {
        this.setState({ searchQuery, currentPage: 1 });
    };

    render() {
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
        const { totalCount, data: users } = this.getPageData();
        const { admin } = this.props;

        return (
            <div className="row">
                <div className="col-4 m-2">
                    <ListGroup
                        items={this.state.roles}
                        onItemSelect={this.handleRoleSelect}
                        selectedItem={this.state.selectedRole}
                    />
                </div>
                <div className="col">
                    {
                        //admin &&
                        <Link to="/users/new" className="col-3 btn btn-primary">
                            New User
                        </Link>
                    }
                    <p
                        type="button"
                        className="btn btn-success m-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Tooltip on top"
                    >
                        Showing {totalCount} users
                    </p>
                    <SearchBox
                        className="form-control my-3"
                        onChange={this.handleSearch}
                        value={searchQuery}
                    />
                    <UsersTable
                        onDelete={this.handleDeleteUser}
                        users={users}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
}

export default Users;
