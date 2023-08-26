import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async () => {
	return axios.get('https://callpurity-db.vercel.app/dashboard-db').then(res => res.data);
});

export const fetchDashboardById = createAsyncThunk('dashboard/fetchDashboardById', async (id) => {
	return axios.get(`https://callpurity-db.vercel.app/dashboard-db/${id}`).then(res => res.data);
});

export const addDashboardItem = createAsyncThunk('dashboard/addDashboardItem', async data => {
	return axios
		.post('https://callpurity-db.vercel.app/dashboard-db', {
			id: data.number,
			company: data.company,
			person: data.person,
			email: data.email,
			number: data.number,
			city: data.city,
			state: data.state,
			adress: data.adress,
			zip: data.zip,
			date: data.date
		})
		.then(res => res.json());
});

export const updateDashboardItem = createAsyncThunk('dashboard/updateDashboardItem', async (data) => {
	return axios
		.patch(`https://callpurity-db.vercel.app/dashboard-db/${data.id}`, {
			id: data.number,
			company: data.company,
			person: data.person,
			email: data.email,
			number: data.number,
			city: data.city,
			state: data.state,
			adress: data.adress,
			zip: data.zip,
			date: data.date,
		})
		.then(res => res.json());
});

export const addNumbers = createAsyncThunk('dashboard/addNumbers', async ({id, data}) => {
	return axios
		.patch(`https://callpurity-db.vercel.app/dashboard-db/${id}`, {
			numbers: data
		})
		.then(res => res.json());
});

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: {
		loading: false,
		dashboard: [],
		error: '',
		isSuccess: ''
	},

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

		//add numbers

		builder.addCase(addNumbers.pending, state => {
			state.loading = true;
			state.error = '';
		});

		builder.addCase(addNumbers.fulfilled, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.isSuccess = action.payload;
			state.error = '';
		});

		builder.addCase(addNumbers.rejected, (state, action) => {
			state.loading = false;
			state.dashboard = [];
			state.error = action.error.message;
		});
	}
});

export default dashboardSlice.reducer;
