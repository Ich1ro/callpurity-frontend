import React from 'react';
import './Menu.css';

import { Add, View, Home, Phone, Upload, Logout, SearchSidebar, Changes, PhoneCall } from '../../icons';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { revertAll } from '../../service/UserSlice';

const nonActive = '#3C5163';

const Menu = () => {
	const user = JSON.parse(window.localStorage.getItem('user'));
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		dispatch(revertAll())
		navigate('/login');
	};

	return (
		<div className="menu-wrapper">
			{user ? (
				user.admin ? (
					<>
						<NavLink
							to={'/dashboard'}
							className={({ isActive, isPending }) =>
								isPending ? 'dashboard' : isActive ? 'active dashboard' : 'dashboard'
							}>
							<div className="dashboard-info">
								<Home fill={nonActive} />
								Dasboard
							</div>
						</NavLink>
						<NavLink
							to={'/add-new'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'menu-item active' : 'menu-item'
							}>
							<Add fill={nonActive} />
							Add New Client Record
						</NavLink>
						<NavLink
							to={'/view'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<View fill={nonActive} />
							View / Modify Existing Client
						</NavLink>
						<NavLink
							to={'/phone'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<Phone />
							Telephone Number Search
						</NavLink>
						<NavLink
							to={'/upload'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<Upload />
							Process FTC Upload
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							to={'/dashboard'}
							className={({ isActive, isPending }) =>
								isPending ? 'dashboard' : isActive ? 'active dashboard' : 'dashboard'
							}>
							<div className="dashboard-info">
								<Home fill={nonActive} />
								Dasboard
							</div>
						</NavLink>
						<NavLink
							to={'/pure-caller-id'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<PhoneCall />
							Pure Caller ID
						</NavLink>
						<NavLink
							to={'/phone'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<SearchSidebar />
							Search number
						</NavLink>
						<NavLink
							to={'/changes'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<Changes />
							Move's / Add's / Changes
						</NavLink>
					</>
				)
			) : (
				<>Loading...</>
			)}
			<div className="menu-line"></div>
			<button className="logout" onClick={onLogout}>
				<Logout />
				<h3 className="logout-title">Log out</h3>
			</button>
		</div>
	);
};

export default Menu;
