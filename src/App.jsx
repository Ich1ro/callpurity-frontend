import React, { useEffect } from 'react';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const userLocal = JSON.parse(window.localStorage.getItem('user'))

	console.log(user);

	useEffect(() => {
		if (userLocal.hasOwnProperty('token') === false) {
			console.log(userLocal);
			navigate('/login');
		}
	}, [user.user.token, navigate, userLocal]);

	return (
		<>
			{userLocal.hasOwnProperty('token') === true ? (
				<div className="wrapper">
					<div className="main">
						<SideBar className="sidebar-wrapper" />
						<div className="content">
							<Header className="header-wrapper" />
							<Outlet />
						</div>
					</div>
					<Footer className="footer-wrapper" />
				</div>
			) : (
				<div>loading...</div>
			)}
		</>
	);
}

export default App;
