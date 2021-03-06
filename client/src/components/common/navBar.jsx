import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ admin }) => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<Link className='navbar-brand' to='/'>
				Quản Lí Bệnh Viện
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNavAltMarkup'
				aria-controls='navbarNavAltMarkup'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>
			<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
				<div className='navbar-nav'>
					{!admin && (
						<React.Fragment>
							<NavLink className='nav-item nav-link' to='/login'>
								Login
							</NavLink>
							<NavLink className='nav-item nav-link' to='/createUser'>
								Create User
							</NavLink>
						</React.Fragment>
					)}
					{admin && (
						<React.Fragment>
							<NavLink className='nav-item nav-link' to='/profile'>
								{admin.name}
							</NavLink>
							<NavLink className='nav-item nav-link' to='/logout'>
								Logout
							</NavLink>
						</React.Fragment>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
