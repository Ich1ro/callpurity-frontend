import React from 'react';
import './Header.css';

const Header = () => {
	const { fullName } = JSON.parse(window.localStorage.getItem('user'));

	return (
		<div className="header">
			<div className="header-items">
				<div className="header-welcome">Welcome,</div>
				<div className="header-item">{fullName}</div>
			</div>
		</div>
	);
};

export default Header;
