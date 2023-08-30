import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './OverusedTable.css';
import thousands from '../../features/numbers';

const OverusedTable = ({ getPromise, config, redirect, data, page, setPage }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPromise);
	}, []);

	const calculateShowingContent = (total, page) => {
		if (total === 1) {
			return ``;
		} else if ((total <= 10) && (page === 0)) {
			return `1-${total} of`
		} else {
			return `${1+(page*10)}-${total > (page+1)*10 ? (page+1)*10 : thousands(total)} of`
		}
	};

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
											<td
												className="status-capitalize"
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
											<td>
												{att}
												<br />
												{obj.attBranded ? (
													<div className="branded">Branded</div>
												) : (
													<div style={{ height: '16px' }}></div>
												)}
											</td>
											<td>
												{tmobile}
												<br />
												{obj.tmobileBranded ? (
													<div className="branded">Branded</div>
												) : (
													<div style={{ height: '16px' }}></div>
												)}
											</td>
											<td>
												{verizon}
												<br />
												{obj.verizonBranded ? (
													<div className="branded">Branded</div>
												) : (
													<div style={{ height: '16px' }}></div>
												)}
											</td>
										</tr>
									);
								}
							})
						) : (
							<>You don't have numbers</>
						)}
					</tbody>
				</table>
			</div>
			<div className="buttons">
				{data?.total && (
					<p className="info">
						Showing {calculateShowingContent(data.total, page)} {data.total} entries
					</p>
				)}
				<div>
					{page === 0 ? (
						<button disabled>Prev</button>
					) : (
						<button onClick={() => setPage(prev => prev - 1)}>Prev</button>
					)}
					{data.pages > 1 && data.pages - 1 !== page ? (
						<button onClick={() => setPage(prev => prev + 1)}>Next</button>
					) : (
						<button disabled>Next</button>
					)}
				</div>
			</div>
		</>
	);
};

export default OverusedTable;
