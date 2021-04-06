import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import auth from '../services/authService';

import Table from './common/table';

class UsersTable extends Component {
	columns = [
		{ path: 'USER_ID', label: 'ID' },
		{
			path: 'USERNAME',
			label: 'Username',
			content: user => <Link to={`/users/${user.USER_ID}`}>{user.USERNAME}</Link>,
		},
		{ path: 'role.ROLE', label: 'Role' },
	];

	deleteColumn = {
		label: 'Delete',
		key: 'delete',
		content: user => (
			<button
				onClick={() => this.props.onDelete(user)}
				className='btn btn-danger btn-sm'
			>
				Delete
			</button>
		),
	};

	constructor () {
		super();
		// const admin = auth.getCurrentUser();
		// if (admin && admin.isAdmin) {
		this.columns.push(this.deleteColumn);
		// }
	}

	render () {
		const { users, sortColumn, onSort } = this.props;
		return (
			<Table
				data={users}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default UsersTable;
