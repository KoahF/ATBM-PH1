import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				className='form-control'
				name={name}
				id={name}
				{...rest}
				disable={name === 'USER_ID' ? 'true' : 'true'}
				autoComplete='on'
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	);
};

export default Input;
