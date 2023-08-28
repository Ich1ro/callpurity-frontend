import React from 'react';
import { useForm } from 'react-hook-form';
import './AddNew.css';
import { useDispatch } from 'react-redux';
import { addDashboardItem } from '../../service/dashboardSlice';

const AddNew = () => {
	const dispatch= useDispatch();
	const token = JSON.parse(window.localStorage.getItem('user')).token
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = (data) => {
		dispatch(addDashboardItem({data, token}))
		reset()
	};

	return (
		<div className="content-wrapper">
			<h2>Add New Client Record</h2>
			<form className='form-add' onSubmit={handleSubmit(onSubmit)}>
				<div className="input-item">
					<div className="input-title">
						Company Name <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="ABC Company"
						type="text"
						{...register('companyName', { required: true })}
						className="add-input"
					/>
					{errors.companyName && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Adress <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="123 Main Street"
						type="text"
						{...register('address', { required: true })}
						className="add-input"
					/>
					{errors.address && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						City <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="New York"
						type="text"
						{...register('city', { required: true })}
						className="add-input"
					/>
					{errors.city && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						State <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="New York"
						type="text"
						{...register('state', { required: true })}
						className="add-input"
					/>
					{errors.state && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Zip Code <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="12345"
						type="text"
						{...register('zipCode', { required: true })}
						className="add-input"
					/>
					{errors.zipCode && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Contact Person <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="John Smith"
						type="text"
						{...register('contactPerson', { required: true })}
						className="add-input"
					/>
					{errors.contactPerson && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Phone <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="123-456-7890"
						type="phone"
						{...register('phone', { required: true })}
						className="add-input"
					/>
					{errors.phone && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						E-mail <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="john@example.com"
						type="email"
						{...register('email', { required: true })}
						className="add-input"
					/>
					{errors.email && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Registration Date <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="123"
						type="date"
						{...register('createdAt', { required: true })}
						className="add-input"
					/>
					{errors.createdAt && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item"> </div>
				<input type="submit" className="submit add-input"></input>
			</form>
		</div>
	);
};

export default AddNew;
