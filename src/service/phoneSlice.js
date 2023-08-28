import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPhones = createAsyncThunk('phones/getPhones', async ({ token }) => {
	return axios
		.get('https://callpurity-backend-6177de9ef619.herokuapp.com/numbers/all', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

export const getPhoneByNumber = createAsyncThunk('phones/getPhoneByNumber', async ({ token, number }) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/numbers/phone?number=${number}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

const phoneSlice = createSlice({
	name: 'phone',
	initialState: {
		loading: false,
		phones: [],
		error: '',
		isSuccess: ''
	},

	extraReducers: builder => {
		// phones get

		builder.addCase(getPhones.pending, state => {
			state.loading = true;
		});

		builder.addCase(getPhones.fulfilled, (state, action) => {
			state.loading = false;
			state.phones = action.payload;
			state.error = '';
		});

		builder.addCase(getPhones.rejected, (state, action) => {
			state.loading = false;
			state.phones = [];
			state.error = action.error.message;
		});

		// get Phone By Number

		builder.addCase(getPhoneByNumber.pending, state => {
			state.loading = true;
		});

		builder.addCase(getPhoneByNumber.fulfilled, (state, action) => {
			state.loading = false;
			state.phones = action.payload;
			state.error = '';
		});

		builder.addCase(getPhoneByNumber.rejected, (state, action) => {
			state.loading = false;
			state.phones = [];
			state.error = action.error.message;
		});
	}
});

export default phoneSlice.reducer;
