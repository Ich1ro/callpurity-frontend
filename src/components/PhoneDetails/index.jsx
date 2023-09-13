import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhoneByNumber } from '../../service/phoneSlice';
import './PhoneDetails.css'

const PhoneDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [data, setData] = useState('');
	const token = JSON.parse(window.localStorage.getItem('user')).token;
	const phoneInfo = useSelector(state => state.phones);

    console.log(phoneInfo);

	useEffect(() => {
		dispatch(getPhoneByNumber({ token, number: id }));
	}, [id]);

	useEffect(() => {
		if (phoneInfo?.phones?.hasOwnProperty('_id')) {
			setData(phoneInfo.phones);
		}
	}, [phoneInfo.phones]);

	return (
		<div className="phone-detail-wrapper">
            <div className="search-result">
				Search Result:&nbsp;
				<p className="search-result-title">{data.tfn} ({data.companyName})</p>
			</div>
			<div className='phone-table'>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>Number:</p>
                    <p className='phone-table-item'>{data.tfn}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>State:</p>
                    <p className='phone-table-item'>{data.state}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>Region:</p>
                    <p className='phone-table-item'>{data.region}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>Status:</p>
                    <p className='phone-table-item status-capitalize' style={
													data.status === 'active'
														? { color: `#3ED48C` }
														: data.status === 'inactive'
														? { color: `#F56666` }
														: { color: `#F2C056` }
												}>{data.status}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>FTC Strikes:</p>
                    <p className='phone-table-item'>{data?.ftcStrikes ? 'Yes' : 'No'}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>Branded Caller ID:</p>
                    <p className='phone-table-item' style={data.attBranded || data.tmobileBranded || data.verizonBranded ? {color: '#3ED48C'} : {color: '#F56666'}}>{data.attBranded || data.tmobileBranded || data.verizonBranded ? 'Yes' : 'No'}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>AT&T Activation:</p>
                    <p className='phone-table-item'>{data.att}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>T-Mobile Activation:</p>
                    <p className='phone-table-item'>{data.tmobile}</p>
                </div>
                <div className='phone-table-cell'>
                    <p className='phone-table-item'>Verizon Activation:</p>
                    <p className='phone-table-item'>{data.verizon}</p>
                </div>
            </div>
		</div>
	);
};

export default PhoneDetails;
