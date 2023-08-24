import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('user/register', async (data) => {
	return axios.post('https://callpurity-backend-6177de9ef619.herokuapp.com/register', {
		fullName: data.fullName,
		email: data.email,
		password: data.password
	}).then(res => res.data);
});

export const login = createAsyncThunk('user/login', async (data) => {
	return axios.post('https://callpurity-backend-6177de9ef619.herokuapp.com/login', {
		email: data.email,
		password: data.password
	}).then(res => res.data);
});

const userSlice = createSlice({
	name: 'dashboard',
	initialState: {
		loading: false,
		user: {},
		error: '',
		isSuccess: ''
	},

	extraReducers: builder => {
		// user register

        builder.addCase(register.pending, state => {
			state.loading = true;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = '';
		});

		builder.addCase(register.rejected, (state, action) => {
			state.loading = false;
			state.user = {};
			state.error = action.error.message;
		});

        // user login

        builder.addCase(login.pending, state => {
			state.loading = true;
		});

		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = '';
		});

		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.user = {};
			state.error = action.error.message;
		});
    }
})

export default userSlice.reducer;