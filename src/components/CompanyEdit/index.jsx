import React, { useEffect, useState } from 'react';
import './CompanyEdit.css';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Save } from '../../icons';
import { fetchDashboardById, updateDashboardItem } from '../../service/dashboardSlice';

const CompanyEdit = () => {
	const [data, setData] = useState('');
	const dispatch = useDispatch();
	const { id } = useParams();
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const company = useSelector(state => state.dashboard.dashboard);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = data => {
		dispatch(updateDashboardItem({ data, token }));
	};

	useEffect(() => {
		dispatch(fetchDashboardById({ id, token }));
	}, []);

	useEffect(() => {
		setData(company);
		reset({ ...company });
	}, [company, reset]);


	return (
		<div>
			{(data !== '') & (data.length !== 0) ? (
				<form onSubmit={handleSubmit(onSubmit)} className="form-add">
					<div className="input-item">
						<div className="input-title">Company Name</div>
						<input type="text" {...register('companyName', { required: true })} className="add-input" />
						{errors.companyName && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">Adress</div>
						<input type="text" {...register('address', { required: true })} className="add-input" />
						{errors.address && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">City</div>
						<input type="text" {...register('city', { required: true })} className="add-input" />
						{errors.city && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">State</div>
						<input type="text" {...register('state', { required: true })} className="add-input" />
						{errors.state && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">Zip Code</div>
						<input type="text" {...register('zipCode', { required: true })} className="add-input" />
						{errors.zipCode && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">Contact Person</div>
						<input type="text" {...register('contactPerson', { required: true })} className="add-input" />
						{errors.contactPerson && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">Phone</div>
						<input type="phone" {...register('phone', { required: true })} className="add-input" />
						{errors.phone && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">E-mail</div>
						<input type="email" {...register('email', { required: true })} className="add-input" />
						{errors.email && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className="input-title">Registration Date</div>
						<input type="date" {...register('createdAt', { required: true })} className="add-input" />
						{errors.createdAt && <span className="error-span">This field is required</span>}
					</div>
					<div className="input-item">
						<div className='input-title'>Status</div>
						<select name="status" {...register('status', { required: 'Select oneOption' })} className="selector">
							<option value="inactive" className='option'>Inactive</option>
							<option value="churned" className='option'>Churned</option>
							<option value="active" className='option'>Active</option>
						</select>
					</div>
					<button type="submit" className="save add-input">
						Save
						<Save width={'20px'} />
					</button>
				</form>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default CompanyEdit;
