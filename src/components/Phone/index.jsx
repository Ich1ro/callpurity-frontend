import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../Search';

const Phone = () => {
	const dispatch = useDispatch();
	
	const [searchVariables, setSearchVariables] = useState('');
	const [value, setValue] = useState('');
	const navigate = useNavigate();

	const onChange = e => {
		setValue(e.target.value);
	};

	const onSearch = (searchTerm, id) => {
		setValue(searchTerm);
		navigate(`./${id}`);
	};

	const handleSearchClick = async () => {
	};

	useEffect(() => {
	}, []);

	return (
		<div className="content-wrapper">
			<h2>Telephone Number Search</h2>
			<div className="search-wrapper">
				{/* <div className="search">
					<input
						type="text"
						className="search-input"
						placeholder="Search..."
						value={value}
						onChange={onChange}
					/>
					<Search className="search-icon" />
				</div>
				<div className="dropdown">
					{searchVariables !== '' && searchVariables.length > 0 ? (
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
					)}
				</div> */}
				{/* <Search
					value={value}
					searchVariables={searchVariables}
					onChange={onChange}
					onSearch={onSearch}
					handleSearchClick={handleSearchClick}
				/> */}
			</div>
		</div>
	);
};

export default Phone;
