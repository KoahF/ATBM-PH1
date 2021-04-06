import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class UserForm extends Form {
	state = {
		data: {
			USERNAME: '',
			ROLE_ID: '',
		},
		roles: [],
		errors: {},
	};

	schema = {
		USERNAME: Joi.string(),
		// USER_ID: Joi.string(),
		ROLE_ID: Joi.string(),
	};

	async populateRoles () {
		const roles = [
			{ ROLE: 'Role hihi', ROLE_ID: '1' },
			{ ROLE: 'Role haha', ROLE_ID: '2' },
		];
		// const [ { rows: data }, { rows: users } ] = await Promise.all([
		// 	roleApi.getAll(),
		// 	userApi.getAll(),
		// ]);
		this.setState({ roles });
	}

	async populateUsers () {
		try {
			const USER_ID = this.props.match.params.id;
			if (USER_ID === 'new') return;

			const data = [
				{
					role: { ROLE: 'Role haha', ROLE_ID: '2' },
					USERNAME: 'huy',
					USER_ID: '2',
				},
				{
					role: { ROLE: 'Role hihi', ROLE_ID: '1' },
					USERNAME: 'kim',
					USER_ID: '1',
				},
			];

			const user = data.filter(d => d.USER_ID === USER_ID)[0];

			// const [ { rows: data }, { rows: users } ] = await Promise.all([
			// 	roleApi.getAll(),
			// 	userApi.getAll(),
			// ]);
			this.setState({ data: this.mapToViewModel(user) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount () {
		await this.populateRoles();
		await this.populateUsers();
	}

	mapToViewModel (user) {
		return {
			USERNAME: user.USERNAME,
			// USER_ID: user.USER_ID,
			ROLE_ID: user.role.ROLE_ID,
		};
	}

	doSubmit = async () => {
		let data = [
			{
				role: { ROLE: 'Role haha', ROLE_ID: '2' },
				USERNAME: 'huy',
				USER_ID: '2',
			},
			{
				role: { ROLE: 'Role hihi', ROLE_ID: '1' },
				USERNAME: 'kim',
				USER_ID: '1',
			},
		];

		if (this.state.data.USER_ID) {
			console.log(this.state.data.USER_ID);
			let index = data.findIndex(d => d.USER_ID === this.state.data.USER_ID);
			data.splice(index, 1, this.state.data);
		}

		this.props.history.push('/users');
	};

	render () {
		return (
			<div>
				<h1> User Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('USERNAME', 'Username')}
					{/* {this.renderInput('USER_ID', 'User_Id')} */}
					{this.renderSelect('ROLE_ID', 'Role', this.state.roles)}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default UserForm;
