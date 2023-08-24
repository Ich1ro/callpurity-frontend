import React, { useEffect } from 'react';
import './CompanyBranded.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDashboardById } from '../../service/dashboardSlice';
import TableNumbers from '../TableNumbers';

const CompanyBranded = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const company = useSelector(state => state.dashboard.dashboard);

	const filteredNumbers = company.numbers ? company.numbers.filter(number => number['AT&T Branded'] === 'Y') : null;

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
			) : (
				<div>You don't have Not Branded numbers</div>
			)}
		</div>
	);
};

export default CompanyBranded;
