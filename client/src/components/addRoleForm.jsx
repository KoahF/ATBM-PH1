import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class AddUserForm extends Form {
	state = {
		data: { username: '', password: '', ROLE_ID: '' },
		roles: [],
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().min(5).required().label('Password'),
		ROLE_ID: Joi.string(),
	};

	async componentDidMount () {
		const roles = [
			{ ROLE: 'Role hihi', ROLE_ID: '1' },
			{ ROLE: 'Role haha', ROLE_ID: '2' },
		];

		this.setState({ roles });
	}

	doSubmit = async () => {
		// Call the server
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render () {
		return (
			<div>
				<h1>Add User</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderSelect('ROLE_ID', 'Role', this.state.roles)}
					{this.renderButton('Add User')}
				</form>
			</div>
		);
	}
}

export default AddUserForm;
