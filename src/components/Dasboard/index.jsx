import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import OverusedTable from '../OverusedTable';

const Dasboard = () => {
	const [page, setPage] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(window.localStorage.getItem('user'));

	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const data = useSelector(state => state.dashboard.dashboard);

	useEffect(() => {
		dispatch(fetchDashboard({token, page}));
	}, [token]);

	const getPromise = () => {
		dispatch(fetchDashboard({token, page}));
	};

	const redirect = id => {
		if (user.admin) {
			navigate(`/view/${id}`);
		}
	};

	return (
		<div className="content-wrapper">
			<h2>Client Pure Caller ID Telephone Numbers</h2>
			{data?.items?.length > 0 ? (
				<>
					<OverusedTable
						getPromise={getPromise}
						config={{
							businessName: { title: 'Business Name', type: 'text' },
							callerNumber: { title: 'Caller Number' },
							status: { title: 'Status', calculateCell: status => {} },
							state: { title: 'State' }
						}}
						redirect={redirect}
						data={data}
						page={page}
						setPage={setPage}
					/>
				</>
			) : (
				<div className="loading">Loading...</div>
			)}
		</div>
	);
};

export default Dasboard;
