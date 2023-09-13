import React, { useEffect, useState } from 'react';
import OverusedTable from '../../components/OverusedTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPhonesById } from '../../service/dashboardPhoneSlice';
import { useNavigate } from 'react-router-dom';

const PureCallerId = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
    const [page, setPage] = useState(0)
	const user = JSON.parse(window.localStorage.getItem('user'));
	const data = useSelector(state => state.dashboardPhones.dashboardPhones);

	const getPromise = () => {
		getPhonesById({ id: user.companyId, token: user.token, page });
	};

	const redirectNumber = number => {
		navigate(`/phone/${number}`);
	};

	useEffect(() => {
		dispatch(getPhonesById({ id: user.companyId, token: user.token, page }));
	}, [dispatch, user.id, page]);
	return (
		<div className="content-wrapper">
			<h2>Pure Caller ID</h2>
			<OverusedTable
				config={{
					callerNumber: { title: 'Caller Number' },
					state: { title: 'State' },
					atAndT: { title: 'AT&T' },
					tMobile: { title: 'T Mobile' },
					verizon: { title: 'Verizon' }
				}}
				getPromise={getPromise}
				data={data}
                page={page}
                setPage={setPage}
				redirectNumber={redirectNumber}
			/>
		</div>
	);
};

export default PureCallerId;
