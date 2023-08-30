import React, { useEffect, useState } from 'react';
import './View.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardForSearch } from '../../service/dashboardSlice';
import { Search } from '../../icons';

const View = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchItems = useSelector(state => state.dashboard.dashboard);
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const [searchVariables, setSearchVariables] = useState('');
	const [value, setValue] = useState('');

	const onChange = e => {
		setValue(e.target.value);
	};

	const onSearch = (searchTerm, id) => {
		setValue('');
		navigate(`./${id}`);
	};

	const handleSearchClick = async () => {
		dispatch(fetchDashboardForSearch(token));
	};

	useEffect(() => {
		if (searchItems?.items?.length > 0) {
			setSearchVariables(searchItems);
		}
	}, [searchItems]);

	return (
		<div className="content-wrapper">
			<h2>View / Modify Existing Client</h2>
			<div className="search-wrapper">
				<div className="search">
					<input
						type="text"
						className="search-input"
						placeholder="Search..."
						value={value}
						onChange={onChange}
						onClick={handleSearchClick}
					/>
					<Search className="search-icon" />
				</div>
				<div className="dropdown-search">
					{searchVariables !== '' ? (
						searchVariables?.items?.length > 1 ? (
							searchVariables.items
								.filter(item => {
									const searchTerm = value.toLowerCase();
									const companyName = item.companyName.toLowerCase();

									return searchTerm && companyName.startsWith(searchTerm);
								})
								.map(value => (
									<div
										className="dropdown-row"
										key={value._id}
										onClick={() => onSearch(value.companyName, value._id)}>
										{value.companyName}
									</div>
								))
						) : (
							<div></div>
						)
					) : (
						<></>
					)}
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default View;
