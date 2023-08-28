import React, { useState } from 'react';
import './Upload.css';

import { Plus } from '../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { ftcUpload } from '../../service/ftcSlice';

const Upload = () => {
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const dispatch = useDispatch();
	const ftcResponse = useSelector(state => state.ftc.ftc);

	const [expandedCompanies, setExpandedCompanies] = useState([]);

	const toggleCompany = companyId => {
		if (expandedCompanies.includes(companyId)) {
			setExpandedCompanies(expandedCompanies.filter(id => id !== companyId));
		} else {
			setExpandedCompanies([...expandedCompanies, companyId]);
		}
	};

	const handleFileUpload = e => {
		const file = e.target.files[0];
		let formData = new FormData();
		formData.append('file', file);
		dispatch(ftcUpload({ file: formData, token }));
	};

	return (
		<div className="content-wrapper">
			<h2>Process FTC Upload</h2>
			<p className="upload-title">Select the CSV file</p>
			<label className="custom">
				<Plus width={'42px'} />
				<input type="file" accept=".csv" onChange={handleFileUpload} />
				Custom file
			</label>
			{ftcResponse.hasOwnProperty('total') ? (
				<div className="ftc-results">
					<h4>Processing Results:</h4>
					<div className="ftc-result-row">
						<p className="ftc-result-title">Total numbers processed: </p>
						<b className="ftc-result-value">{ftcResponse.total}</b>
					</div>
					<div className="ftc-result-row">
						<p className="ftc-result-title">Number of numbers flegged with FTC: </p>
						<b className="ftc-result-value">{ftcResponse.ftcFlagged}</b>
					</div>
					<div className="ftc-result-companies">
						<p className="ftc-result-item ftc-result-title">List of clients with FTC flags: </p>
						{ftcResponse?.items?.length > 0 ? (
							ftcResponse.items.map(item => (
								<div key={item._id} className="ftc-result-item">
									<div onClick={() => toggleCompany(item._id)}>{item.companyName}</div>
									{expandedCompanies.includes(item._id) && (
										<ul>
											{item.numbers.map(number => (
												<li key={number._id} className='ftc-result-number'>{number.tfn}</li>
											))}
										</ul>
									)}
								</div>
							))
						) : (
							<>Your clients don't have FTC flags</>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Upload;
