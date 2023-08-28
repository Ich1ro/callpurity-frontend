import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const ftcUpload = createAsyncThunk('ftc/upload', async ({ file, token }) => {
	return axios
		.post('https://callpurity-backend-6177de9ef619.herokuapp.com/numbers/ftc', file,
        {
			headers: {
				Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
			}
		})
		.then(res => res.data);
});

const ftcSlice = createSlice({
	name: 'ftc',
	initialState: {
		loading: false,
		ftc: [],
		error: '',
		isSuccess: ''
	},

	extraReducers: builder => {
		// phones get

		builder.addCase(ftcUpload.pending, state => {
			state.loading = true;
		});

		builder.addCase(ftcUpload.fulfilled, (state, action) => {
			state.loading = false;
			state.ftc = action.payload;
			state.error = '';
		});

		builder.addCase(ftcUpload.rejected, (state, action) => {
			state.loading = false;
			state.ftc = [];
			state.error = action.error.message;
		});
	}
});

export default ftcSlice.reducer;
