import React, { useCallback, useEffect, useState } from 'react';
import './Details.css';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { addNumbers, fetchDashboardById } from '../../service/dashboardSlice';
import Papa from 'papaparse';

const CompanyDetails = () => {
	const [data, setData] = useState('');
	const location = useLocation()
	const dispatch = useDispatch();
	const { id } = useParams();
	const company = useSelector(state => state.dashboard.dashboard);

	const handleFileUpload = e => {
		const file = e.target.files[0];
		Papa.parse(file, {
			header: true,
			complete: res => {
				dispatch(addNumbers({ id: id, data: res.data }));
			}
		});
	};

	useEffect(() => {
		dispatch(fetchDashboardById(id));
		setData(company.company)
	}, [dispatch, id, company.company]);

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
					<label className="download-numbers">Download Numbers</label>
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
