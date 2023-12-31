import React, { useEffect, useState } from 'react';
import './CompanyBranded.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OverusedTable from '../OverusedTable';
import { getPhonesByBranded } from '../../service/dashboardPhoneSlice';
import Loader from '../Loader';

const CompanyBranded = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [page, setPage] = useState(0);
	const { id } = useParams();
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const data = useSelector(state => state.dashboardPhones.dashboardPhones);
	const loading = useSelector(state => state.dashboardPhones.loading);

	const getPromise = () => {
		getPhonesByBranded({ id, token, branded: true });
	};

	const redirectNumber = number => {
		navigate(`/phone/${number}`);
	};

	useEffect(() => {
		dispatch(getPhonesByBranded({ id, token, branded: true }));
	}, [dispatch, id, token]);

	return (
		<div>
			{data?.items?.length > 0 && loading === false ? (
				<OverusedTable
					getPromise={getPromise}
					config={{
						callerNumber: { title: 'Caller Number' },
						state: { title: 'State' },
						atAndT: { title: 'AT&T' },
						tMobile: { title: 'T Mobile' },
						verizon: { title: 'Verizon' }
					}}
					data={data}
					page={page}
					setPage={setPage}
					redirectNumber={redirectNumber}
				/>
			) : loading ? (
				<Loader />
			) : (
				<div className="empty">You don't have Branded numbers</div>
			)}
		</div>
	);
};

export default CompanyBranded;
