import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state
const initialState = {
  data: [],
  loading: 'idle',
  error: null,
  searchQuery: "",
  numResults: 10
};

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async ({ searchQuery, numResults }) => {
  const url = `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${searchQuery}&numResults=${numResults}`;
  const response = await axios.get(url);
  return response.data;
});

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    changeSearchText: (state, action) => {
      state.searchQuery = action.payload;
    },
    changeNumResult: (state, action) => {
      state.numResults = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {changeNumResult, changeSearchText} = videosSlice.actions;

export default videosSlice.reducer;