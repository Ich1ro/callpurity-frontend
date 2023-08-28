import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNumbers = createAsyncThunk('dashboardPhones/addNumbers', async ({ id, file, token }) => {
	return axios
		.post(`https://callpurity-backend-6177de9ef619.herokuapp.com/numbers?id=${id}`, file,
		{
			headers: {
				Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
			}
		})
		.then(res => res.json());
});

export const downloadNumbers = createAsyncThunk('dashboardPhones/downloadNumbers', async ({ id, token }) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/numbers/download?id=${id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
                // "Content-Type": "multipart/form-data"
			}
		})
		.then(res => res.data);
});

export const getPhonesById = createAsyncThunk('dashboardPhones/getPhonesById', async ({ id, token, page }) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/numbers?id=${id}&page=${page?page:0}`, 
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

export const getPhonesByBranded = createAsyncThunk('dashboardPhones/getPhonesByBranded', async ({ id, branded, token, page }) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/numbers?id=${id}&branded=${branded}&page=${page?page:0}`, 
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

const dashboardPhoneSlice = createSlice({
	name: 'phone',
	initialState: {
		loading: false,
		dashboardPhones: [],
		error: '',
		isSuccess: ''
	},

	extraReducers: builder => {
		//add numbers

		builder.addCase(addNumbers.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(addNumbers.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboardPhones = [];
			state.isSuccess = true;
			state.error = '';
		});

		builder.addCase(addNumbers.rejected, (state, action) => {
			state.loading = false;
			state.dashboardPhones = [];
			state.error = action.error.message;
		});

        //get phones by id

        builder.addCase(getPhonesById.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(getPhonesById.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboardPhones = action.payload;
			state.isSuccess = true;
			state.error = '';
		});

		builder.addCase(getPhonesById.rejected, (state, action) => {
			state.loading = false;
			state.dashboardPhones = [];
			state.error = action.error.message;
		});

		// get phones by branded

        builder.addCase(getPhonesByBranded.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(getPhonesByBranded.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboardPhones = action.payload;
			state.isSuccess = true;
			state.error = '';
		});

		builder.addCase(getPhonesByBranded.rejected, (state, action) => {
			state.loading = false;
			state.dashboardPhones = [];
			state.error = action.error.message;
		});

        //download numbers

        builder.addCase(downloadNumbers.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(downloadNumbers.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboardPhones = action.payload;
			state.isSuccess = true;
			state.error = '';
		});

		builder.addCase(downloadNumbers.rejected, (state, action) => {
			state.loading = false;
			state.dashboardPhones = [];
			state.error = action.error.message;
		});

	}
});

export default dashboardPhoneSlice.reducer;
