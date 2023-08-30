import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const feedBackUpload = createAsyncThunk('feedback/upload', async ({ data, token }) => {
	return axios
		.post('https://callpurity-backend-6177de9ef619.herokuapp.com/feedback', data,
        {
			headers: {
				Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
			}
		})
		.then(res => res.data);
});

const feedbackSlice = createSlice({
	name: 'feedback',
	initialState: {
		loading: false,
		feedback: [],
		error: '',
		isSuccess: ''
	},

	extraReducers: builder => {
		// phones get

		builder.addCase(feedBackUpload.pending, state => {
			state.loading = true;
		});

		builder.addCase(feedBackUpload.fulfilled, (state, action) => {
			state.loading = false;
			state.feedback = action.payload;
			state.error = '';
		});

		builder.addCase(feedBackUpload.rejected, (state, action) => {
			state.loading = false;
			state.feedback = [];
			state.error = action.error.message;
		});
	}
});

export default feedbackSlice.reducer;
