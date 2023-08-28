import React, { useEffect, useState } from 'react';
import './Details.css';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { fetchDashboardById } from '../../service/dashboardSlice';
import { addNumbers } from '../../service/dashboardPhoneSlice';
import axios from 'axios';

const CompanyDetails = () => {
	const [data, setData] = useState('');
	const dispatch = useDispatch();
	const { id } = useParams();
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const company = useSelector(state => state.dashboard.dashboard);

	const handleFileUpload = e => {
		const file = e.target.files[0];
		let formData = new FormData();
		formData.append('file', file);
		dispatch(addNumbers({ id, file: formData, token }));
	};

	const handleDownload = async () => {
		await axios
			.get('https://callpurity-backend-6177de9ef619.herokuapp.com/numbers/download?id=64ea78636e11de6df8a19577', {
				headers: {
					Authorization: `Bearer ${token}`
				},
			})
			.then(response => {
				const csvData = response.data
				const blob = new Blob([csvData], { type: 'text/csv' });
				const url = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = 'data.csv';
				link.click();
				URL.revokeObjectURL(url);
			});
	};

	useEffect(() => {
		dispatch(fetchDashboardById({ id, token }));
		setData(company.companyName);
	}, [company.companyName, dispatch, id]);

	return (
		<div className="details-wrapper">
			<div className="search-result">
				Search Result:&nbsp;
				<p className="search-result-title">{data}</p>
			</div>
			<div className="details-button-wrapper">
				<div className="details-buttons">
					<NavLink
						to={'./edit'}
						className={({ isActive, isPending }) =>
							isPending ? 'details-button' : isActive ? 'active-details details-button' : 'details-button'
						}>
						Client Data
					</NavLink>
					<NavLink
						to={'./not-branded'}
						className={({ isActive, isPending }) =>
							isPending ? 'details-button' : isActive ? 'active-details details-button' : 'details-button'
						}>
						TFN Pure CID
					</NavLink>
					<NavLink
						to={'./branded'}
						className={({ isActive, isPending }) =>
							isPending ? 'details-button' : isActive ? 'active-details details-button' : 'details-button'
						}>
						TFN Pure Branded CID
					</NavLink>
				</div>
				<div className="numbers-buttons">
					<label className="download-numbers" onClick={handleDownload}>
						Download Numbers
					</label>
					<label className="add-numbers">
						<input type="file" accept=".csv" onChange={handleFileUpload} />
						Add Numbers
					</label>
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default CompanyDetails;
