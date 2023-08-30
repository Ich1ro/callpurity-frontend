import React, { useEffect, useState } from 'react';
import './Changes.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { feedBackUpload } from '../../service/feedbackSlice';
import toast, { Toaster } from 'react-hot-toast';

const Changes = () => {
	const dispatch = useDispatch();
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const feedback = useSelector(state => state.feedback.feedback);
	const [selectedFileName, setSelectedFileName] = useState('');

	console.log(feedback);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const handleFileChange = event => {
		const file = event.target.files[0];
		setSelectedFileName(file.name);
	};

	const onSubmit = data => {
		const formData = new FormData();
		formData.append('file', data.file[0]);
		data = { ...data, file: formData };
		dispatch(feedBackUpload({ data, token }));

		reset();
	};

	useEffect(() => {
		if (feedback.message ) {
			toast.success(feedback.message);
		}
	}, [feedback]);

	return (
		<div className="content-wrapper">
			<Toaster position="top-right" reverseOrder={false} />
			<h2>Moves / Adds & Changes</h2>
			<p className="changes-info">
				If you would like to change your current enrollment in any way, please create a support ticket through
				the form below and we will make any changes for you. Please allow up to 72 hours for the changes to
				propagate and go live across all the major US wireless carrier networks.
			</p>
			<form className="form-add" onSubmit={handleSubmit(onSubmit)}>
				<div className="input-item">
					<div className="input-title">
						Company name <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="Your company name"
						type="text"
						{...register('companyName', { required: true })}
						className="add-input"
					/>
					{errors.companyName && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						First name <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="Your name"
						type="text"
						{...register('firstName', { required: true })}
						className="add-input"
					/>
					{errors.firstName && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">
						E-mail <p className="input-star">&nbsp;*</p>
					</div>
					<input
						placeholder="Your e-mail"
						type="email"
						{...register('email', { required: true })}
						className="add-input"
					/>
					{errors.email && <span className="error-span">This field is required</span>}
				</div>
				<div className="input-item">
					<div className="input-title">Go Live Date</div>
					<input placeholder="" type="date" {...register('date')} className="add-input" />
				</div>
				<div className="text-area-wrapper">
					<div className="input-title">
						Description of what you want changed<p className="input-star">&nbsp;*</p>
					</div>
					<textarea
						placeholder="Brief note about what you are looking for..."
						type="text"
						className="text-area"
						{...register('description', { required: true })}
					/>
					{errors.description && <span className="error-span">This field is required</span>}
				</div>

				<div className="submit-container">
					<input type="submit" className="submit add-input" value="Submit"></input>
				</div>
				<label className="attach-file">
					<input
						type="file"
						accept=".csv, .xls, .xlsx, .doc, .docx, .txt"
						className="add-input"
						{...register('file')}
						onChange={handleFileChange}
					/>
					{selectedFileName !== '' ? selectedFileName : 'Upload file'}
				</label>
			</form>
		</div>
	);
};

export default Changes;
