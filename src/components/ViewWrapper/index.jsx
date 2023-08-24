import React, { useCallback, useEffect, useState } from 'react';
import './View.css';

import { Outlet, useNavigate } from 'react-router-dom';
import thunk from 'redux-thunk'
import { Search } from '../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';

const View = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const middlewares = [thunk]
	const searchItems = useSelector(state => state.dashboard);
	const [searchVariables, setSearchVariables] = useState('');
	const [value, setValue] = useState('');

	const onChange = e => {
		setValue(e.target.value);
	};

	const onSearch = (searchTerm, id) => {
		setValue(searchTerm);
		navigate(`./${id}`);
	};

	const HandleSearchClick = async () => {
		dispatch(fetchDashboard())
	}

	useEffect(() => {
		if(searchItems.dashboard.length > 0) {
			setSearchVariables(searchItems)
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
						onClick={HandleSearchClick}
					/>
					<Search className="search-icon" />
				</div>
				<div className="dropdown">
					{searchVariables !== '' ? searchVariables?.dashboard.length > 1 ? (
						searchVariables.dashboard
							.filter(item => {
								const searchTerm = value.toLowerCase();
								const companyName = item.company.toLowerCase();

								return searchTerm && companyName.startsWith(searchTerm) && companyName !== searchTerm;
							})
							.map(value => (
								<div
									className="dropdown-row"
									key={value.id}
									onClick={() => onSearch(value.company, value.id)}>
									{value.company}
								</div>
							))
					) : (
						<div></div>
					) : <></>}
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default View;
