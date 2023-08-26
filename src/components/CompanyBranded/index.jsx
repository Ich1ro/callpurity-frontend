import React, { useEffect } from 'react';
import './CompanyBranded.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDashboardById } from '../../service/dashboardSlice';
import TableNumbers from '../TableNumbers';
import OverusedTable from '../OverusedTable';

const CompanyBranded = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const company = useSelector(state => state.dashboard.dashboard);

	const filteredNumbers = company.numbers ? company.numbers.filter(number => number['AT&T Branded'] === 'Y') : null;

	console.log(company);

	const title = {
		first: 'Caller Number',
		second: 'Status',
		third: 'State'
	};

	useEffect(() => {
		dispatch(fetchDashboardById(id));
	}, []);

	return (
		<div>
			{filteredNumbers !== null ? (
				<TableNumbers title={title} data={filteredNumbers} />
				// <OverusedTable
				// 	getPromise={id => dispatch(fetchDashboardById(id))}
				// 	config={{
				// 		callerNumber: { title: 'Caller Number' },
				// 		state: { title: 'State' },
				// 		atAndT: { title: 'AT&T' },
				// 		tMobile: { title: 'T Mobile' },
				// 		verizon: { title: 'Verizon' }
				// 	}}
				// />
			) : (
				<div>You don't have Not Branded numbers</div>
			)}
		</div>
	);
};

export default CompanyBranded;
