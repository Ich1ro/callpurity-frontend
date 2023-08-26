import React, { useEffect, useMemo, useState } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../service/dashboardSlice';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import Table from '../Table';
import OverusedTable from '../OverusedTable';

const Dasboard = () => {
	// const [page, setPage] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const data = useSelector(state => state.dashboard);
	console.log(data);

	const handleClick = id => {
		navigate(`/view/${id}`);
	};

	useEffect(() => {
		dispatch(fetchDashboard());
	}, []);

	const getPromise = () => {
		dispatch(fetchDashboard());
	};

	const redirect = id => {
		navigate(`/view/${id}`);
	};

	const title = {
		first: 'Business Name',
		second: 'Caller Number',
		third: 'State'
	};

	return (
		<div className="content-wrapper">
			<h2>Client Pure Caller ID Telephone Numbers</h2>
			{data?.dashboard?.length > 0 ? (
				<>
					{/* <Table data={data.dashboard} handleClick={handleClick} title={title} /> */}
					<OverusedTable
						getPromise={getPromise}
						config={{
							businessName: { title: 'Business Name', type: 'text' },
							callerNumber: { title: 'Caller Number' },
							status: { title: 'Status', calculateCell: status => {} },
							state: { title: 'State' }
						}}
						redirect={redirect}
					/>
				</>
			) : (
				<div className="loading">Loading...</div>
			)}
		</div>
	);
};

export default Dasboard;
