import React, { useEffect } from 'react';
import './Login.css';
import logo from '../../logo.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../service/UserSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.user);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit = async data => {
		dispatch(login(data));
	};

	useEffect(() => {
		window.localStorage.setItem('user', JSON.stringify(user));
        if(user.hasOwnProperty('token')) {
		    navigate('/dashboard');
        }
    }, [user, navigate]);

	return (
		<div className="login-wrapper">
			<img src={logo} alt="logo" />
			<h2>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<div className="login-input-item">
					<div className="login-input-title">
						Email<p className="input-star">&nbsp;*</p>
					</div>
					<input type="email" {...register('email', { required: true })} className="login-add-input" />
					{errors.email && <span className="error-span">This field is required</span>}
				</div>
				<div className="login-input-item">
					<div className="login-input-title">
						Password<p className="input-star">&nbsp;*</p>
					</div>
					<input type="password" {...register('password', { required: true })} className="login-add-input" />
					{errors.email && <span className="error-span">This field is required</span>}
				</div>
				<button type="submit" className="login-submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
