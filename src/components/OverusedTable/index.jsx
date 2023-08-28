import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './OverusedTable.css'

const OverusedTable = ({ getPromise, config, redirect, data, page, setPage}) => {
	const dispatch = useDispatch();

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
						{data?.items?.length !== 0 ? (
							data?.items?.map(obj => {
								if (obj.hasOwnProperty('companyName')) {
									const { companyName, phone, status, state } = obj;
									return (
										<tr key={obj._id} onClick={() => redirect(obj._id)}>
											<td>{companyName}</td>
											<td>{phone}</td>
											<td className='status-capitalize'
												style={										
													obj.status === 'active'
														? { color: `#3ED48C` }
														: obj.status === 'inactive'
														? { color: `#F56666` }
														: { color: `#F2C056` }
												}>
												{status ? obj.status : 'Active'}
											</td>
											<td>{state}</td>
										</tr>
									);
								} else {
									const { tfn, state, tmobile, att, verizon } = obj;
									return (
										<tr key={obj._id}>
											<td>{tfn}</td>
											<td>{state}</td>
											<td>{tmobile}</td>
											<td>{att}</td>
											<td>{verizon}</td>
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
				{data?.total && <p className="info">Showing 1-10 of {data.total} entries</p>}
				<div>
					{page === 0 ? <button disabled>Prev</button> : <button onClick={() => setPage(prev => prev - 1)}>Prev</button>}
					{data.pages > 1 ? <button onClick={() => setPage(prev => prev + 1)}>Next</button> : <button disabled>Next</button>}
				</div>
			</div>
		</>
	);
};

export default OverusedTable;
