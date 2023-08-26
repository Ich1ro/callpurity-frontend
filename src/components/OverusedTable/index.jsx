import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OverusedTable = ({ getPromise, config, redirect }) => {
	const data = useSelector(state => state.dashboard.dashboard);
	const dispatch = useDispatch();

	console.log(data);

	useEffect(() => {
		dispatch(getPromise);
	}, []);

	return (
		<>
			<div className="table">
				<table className="dash-table">
					<thead>
						{config.hasOwnProperty('businessName') ? (
							<tr>
								<th>{config.businessName.title}</th>
								<th>{config.callerNumber.title}</th>
								<th>{config.status.title}</th>
								<th>{config.state.title}</th>
							</tr>
						) : (
							<tr>
								<th>{config.callerNumber.title}</th>
								<th>{config.state.title}</th>
								<th>{config.atAndT.title}</th>
								<th>{config.tMobile.title}</th>
								<th>{config.verizon.title}</th>
							</tr>
						)}
					</thead>
					<tbody>
						{data.length !== 0 ? (
							data.map((obj, key) => {
								if (obj.hasOwnProperty('company')) {
									const { company, number, status, state } = obj;
									return (
										<tr key={key} onClick={() => redirect(obj.id)}>
											<td>{company}</td>
											<td>{number}</td>
											<td>{status ? obj.status : 'Active'}</td>
											<td>{state}</td>
										</tr>
									);
								} else {
									const { TFN, state, Tmobile, 'AT&T': atAndT, Verizon } = obj;
									return (
										<tr key={key}>
											<td>{TFN}</td>
											<td>{state}</td>
											<td>{Tmobile}</td>
											<td>{atAndT}</td>
											<td>{Verizon}</td>
										</tr>
									);
								}
							})
						) : (
							<>Loading...</>
						)}
					</tbody>
				</table>
			</div>
			<div className="buttons">
				<button>Prev</button>
				<button>Next</button>
			</div>
		</>
	);
};

export default OverusedTable;
