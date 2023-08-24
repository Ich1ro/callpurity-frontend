import React, { useEffect, useState } from 'react';
import './Upload.css';
import Papa from 'papaparse';

import { Plus } from '../../icons';

const Upload = () => {
	const [data, setData] = useState([]);

	const handleFileUpload = e => {
		const file = e.target.files[0];
		Papa.parse(file, {
			header: true,
			complete: res => {
				setData(res.data);
		localStorage.setItem('data', JSON.stringify(data));

			}
		});
	};

  console.log(data);

	return (
		<div className="content-wrapper">
			<h2>Process FTC Upload</h2>
			<p className='upload-title'>Select the CSV file</p>
			<label className="custom">
				<Plus width={'42px'}/>
				<input type="file" accept=".csv" onChange={handleFileUpload} />
				Custom file
			</label>
		</div>
	);
};

export default Upload;
