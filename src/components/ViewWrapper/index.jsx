import React, { useEffect, useState } from 'react';
import './View.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';
import Search from '../Search';

const View = () => {
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	// const searchItems = useSelector(state => state.dashboard);
	// const [searchVariables, setSearchVariables] = useState('');
	// const [value, setValue] = useState('');

	// const onChange = e => {
	// 	setValue(e.target.value);
	// };

	// const onSearch = (searchTerm, id) => {
	// 	setValue(searchTerm);
	// 	navigate(`./${id}`);
	// };

	// const handleSearchClick = async () => {
	// 	dispatch(fetchDashboard());
	// };

	// useEffect(() => {
	// 	if (searchItems.dashboard.length > 0) {
	// 		setSearchVariables(searchItems);
	// 	}
	// }, []);

	return (
		<div className="content-wrapper">
			<h2>View / Modify Existing Client</h2>
			<div className="search-wrapper">
				{/* <Search
					value={value}
					searchVariables={searchVariables}
					onChange={onChange}
					onSearch={onSearch}
					handleSearchClick={handleSearchClick}
				/> */}
			</div>
			<Outlet />
		</div>
	);
};

export default View;
