import React from 'react';
import './SideBarMenu.css';

import { FaHome, BiSolidAddToQueue, IoIosEye, BiSolidPhoneCall, PiFileArrowDownFill, IoIosLogOut, BsFillPhoneVibrateFill, BsSearch, FaLifeRing } from '../../icons';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { revertAll } from '../../service/UserSlice';

const SideBarMenu = () => {
	const user = JSON.parse(window.localStorage.getItem('user'));
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		dispatch(revertAll());
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
								<FaHome />
								Dasboard
							</div>
						</NavLink>
						<NavLink
							to={'/add-new'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'menu-item active' : 'menu-item'
							}>
							<BiSolidAddToQueue />
							Add New Client Record
						</NavLink>
						<NavLink
							to={'/view'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<IoIosEye />
							View / Modify Existing Client
						</NavLink>
						<NavLink
							to={'/phone'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<BiSolidPhoneCall />
							Telephone Number Search
						</NavLink>
						<NavLink
							to={'/upload'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<PiFileArrowDownFill />
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
								<FaHome />
								Dasboard
							</div>
						</NavLink>
						<NavLink
							to={'/pure-caller-id'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<BsFillPhoneVibrateFill />
							Pure Caller ID
						</NavLink>
						<NavLink
							to={'/phone'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<BsSearch />
							Search number
						</NavLink>
						<NavLink
							to={'/changes'}
							className={({ isActive, isPending }) =>
								isPending ? 'menu-item' : isActive ? 'active menu-item' : 'menu-item'
							}>
							<FaLifeRing />
							Move's / Add's / Changes
						</NavLink>
					</>
				)
			) : (
				<></>
			)}
			<div className="menu-line"></div>
			<button className="logout" onClick={onLogout}>
				<IoIosLogOut />
				<h3 className="logout-title">Log out</h3>
			</button>
		</div>
	);
};

export default SideBarMenu;
