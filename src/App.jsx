import React, { useEffect } from 'react';
import SideBar from './pages/SideBar';
import Footer from './components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useSelector } from 'react-redux';

function App() {
	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const userLocal = JSON.parse(window.localStorage.getItem('user'));

	useEffect(() => {
		if (userLocal.hasOwnProperty('token') === false) {
			navigate('/login');
		}
	}, [user.user.token, navigate, userLocal]);

	return (
		<>
			{userLocal.hasOwnProperty('token') === true && (
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
			)}
		</>
	);
}

export default App;
