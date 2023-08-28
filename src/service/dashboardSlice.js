import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async ({token, page}) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/clients?page=${page}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

export const fetchDashboardById = createAsyncThunk('dashboard/fetchDashboardById', async ({ id, token }) => {
	return axios
		.get(`https://callpurity-backend-6177de9ef619.herokuapp.com/clients/byId?id=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.data);
});

export const addDashboardItem = createAsyncThunk('dashboard/addDashboardItem', async ({ data, token }) => {
	return axios
		.post(
			'https://callpurity-backend-6177de9ef619.herokuapp.com/clients',
			{
				companyName: data.companyName,
				contactPerson: data.contactPerson,
				email: data.email,
				phone: data.phone,
				city: data.city,
				state: data.state,
				address: data.address,
				zipCode: data.zipCode,
				createdAt: data.createdAt
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then(res => res.json());
});

export const updateDashboardItem = createAsyncThunk('dashboard/updateDashboardItem', async ({data, token}) => {
	return axios
		.patch(`https://callpurity-backend-6177de9ef619.herokuapp.com/clients?id=${data._id}`, {
			companyName: data.companyName,
			contactPerson: data.contactPerson,
			phone: data.phone,
			city: data.city,
			state: data.state,
			address: data.address,
			zipCode: data.zipCode,
			createdAt: data.createdAt
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json());
});


const initialState = {
	loading: false,
		dashboard: [],
		error: '',
		isSuccess: ''
}


const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,

	extraReducers: builder => {
		// fetch dashboard

		builder.addCase(fetchDashboard.pending, state => {
			state.loading = true;
		});

		builder.addCase(fetchDashboard.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboard = action.payload;
			state.error = '';
		});

		builder.addCase(fetchDashboard.rejected, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.error = action.error.message;
		});

		// fetch dashboard by id

		builder.addCase(fetchDashboardById.pending, state => {
			state.loading = true;
		});

		builder.addCase(fetchDashboardById.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboard = action.payload;
			state.error = '';
		});

		builder.addCase(fetchDashboardById.rejected, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.error = action.error.message;
		});

		// add dashboard item

		builder.addCase(addDashboardItem.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(addDashboardItem.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.isSuccess = action.payload;
			state.error = '';
		});

		builder.addCase(addDashboardItem.rejected, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.error = action.error.message;
		});

		//update dashboard item

		builder.addCase(updateDashboardItem.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(updateDashboardItem.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.isSuccess = action.payload;
			state.error = '';
		});

		builder.addCase(updateDashboardItem.rejected, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.error = action.error.message;
		});
	}
});

export default dashboardSlice.reducer;
