import React from 'react';
import { useForm } from 'react-hook-form';
import './AddNew.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDashboardItem } from '../../service/dashboardSlice';

const AddNew = () => {
	const dispatch= useDispatch();
	const { isSuccess } = useSelector( (state)=> state.dashboard);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {
		await dispatch(addDashboardItem(data))
		reset()
	};

	return (
		<div className="content-wrapper">
			<h2>Add New Client Record</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='form'>
				<div className="input-item">
					<div className="input-title">
						Company Name <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="ABC Company"
						type="text"
						{...register('company', { required: true })}
						className="add-input"
					/>
					{errors.company && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Adress <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="123 Main Street"
						type="text"
						{...register('adress', { required: true })}
						className="add-input"
					/>
					{errors.adress && <span className="error-span">This field is required</span>}
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
						{...register('zip', { required: true })}
						className="add-input"
					/>
					{errors.zip && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Contact Person <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="John Smith"
						type="text"
						{...register('person', { required: true })}
						className="add-input"
					/>
					{errors.person && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						Phone <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="123-456-7890"
						type="phone"
						{...register('number', { required: true })}
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
						{...register('date', { required: true })}
						className="add-input"
					/>
					{errors.date && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item"> </div>
				<input type="submit" className="submit add-input"></input>
			</form>
		</div>
	);
};

export default AddNew;
