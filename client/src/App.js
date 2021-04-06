// dependencies
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// component
import NavBar from './components/common/navBar';
import ProtectedRoute from './components/common/protectedRoute';

import Users from './components/users';
import NotFound from './components/notFound';
import UserForm from './components/userForm';
// import LoginForm from './components/loginForm';
import AddUserForm from './components/addRoleForm';
// import Logout from './components/logout';
// import auth from './services/authService';
// css
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	state = {};

	componentDidMount () {
		// const user = auth.getCurrentUser();
		// this.setState({ user });
		// const admin = auth.getCurrentUser();
		// this.setState({ admin });
	}

	render () {
		const { admin } = this.state;

		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={admin} />
				<main className='container'>
					<Switch>
						<Route path='/createUser' component={AddUserForm} />
						{/* <Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} /> */}
						<ProtectedRoute path='/users/:id' component={UserForm} />
						<Route
							path='/users'
							render={props => <Users {...props} admin={admin} />}
						/>
						<Route path='/not-found' component={NotFound} />
						<Redirect exact from='/' to='/users' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
