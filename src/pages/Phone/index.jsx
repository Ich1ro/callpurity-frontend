import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getPhones } from '../../service/phoneSlice';
import { BsSearch } from '../../icons';

const Phone = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(window.localStorage.getItem('user'));
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const searchItems = useSelector(state => state.phones);
	const [searchVariables, setSearchVariables] = useState('');
	const [value, setValue] = useState('');

	const onChange = e => {
		setValue(e.target.value);
	};

	const onSearch = number => {
		setValue('');
		navigate(`./${number}`);
	};

	const handleSearchClick = () => {
		dispatch(getPhones({ token }));
	};

	useEffect(() => {
		if (searchItems?.phones?.length > 0) {
			setSearchVariables(searchItems);
		}
	}, [searchItems]);

	return (
		<div className="content-wrapper">
			<h2>Telephone Number Search</h2>
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
					<BsSearch className="search-icon" />
				</div>
				<div className="dropdown-search">
					{user.admin ? (
						searchVariables !== '' ? (
							searchVariables?.phones?.length > 1 ? (
								searchVariables.phones
									.filter(item => {
										const searchTerm = value.toLowerCase();
										const number = item.toLowerCase();

										return searchTerm && number.startsWith(searchTerm);
									})
									.map((balue, key) => (
										<div className="dropdown-row" key={key} onClick={() => onSearch(balue)}>
											{balue}
										</div>
									))
							) : (
								<div></div>
							)
						) : (
							<></>
						)
					) : (searchVariables !== '' ? (
						searchVariables?.phones?.length > 0 ? (
							searchVariables.phones
								.filter(item => {
									const searchTerm = value.toLowerCase();
									const number = item.tfn;

									return searchTerm && number.startsWith(searchTerm);
								})
								.map((phone, key) => (
									<div className="dropdown-row" key={key} onClick={() => onSearch(phone.tfn)}>
										{phone.tfn}
									</div>
								))
						) : (
							<div></div>
						)
					) : (
						<></>
					))}
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default Phone;
