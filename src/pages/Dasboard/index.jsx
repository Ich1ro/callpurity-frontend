import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import OverusedTable from '../../components/OverusedTable';
import Loader from '../../components/Loader';

const Dasboard = () => {
	const [page, setPage] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = JSON.parse(window.localStorage.getItem('user'));

	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const data = useSelector(state => state.dashboard.dashboard);
	const loading = useSelector(state => state.dashboard.loading);
	// const data = []

	console.log(loading);

	useEffect(() => {
		dispatch(fetchDashboard({ token, page }));
	}, [page]);

	const getPromise = () => {
		fetchDashboard({ token, page })
	};

	const redirect = id => {
		if (user.admin) {
			navigate(`/view/${id}/edit`);
		}
	};

	return (
		<div className="content-wrapper">
			<h2>Client Pure Caller ID Telephone Numbers</h2>
			{(data?.items?.length > 0 && loading === false) ? (
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
			) : loading === true ? (
				<Loader />				
			) : <div className='empty-companies'>No companies found</div>}
		</div>
	);
};

export default Dasboard;
