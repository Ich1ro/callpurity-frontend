import React from 'react';
import './Table.css';

const Table = ({ data, title, handleClick }) => {
	return (
		<>
			<div className="table">
				<table className="dash-table">
					<thead>
						<tr>
							<th>{title.first}</th>
							<th>{title.second}</th>
							<th>{title.third}</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, key) => {
							return (
								<tr key={key} onClick={() => handleClick(value.id)}>
									<td>{value.company}</td>
									<td>{value.number}</td>
									<td>{value.state}</td>
								</tr>
							);
						})}
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

export default Table;
