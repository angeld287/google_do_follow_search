import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { searchAsync } from './asyncThunks';
import { ISearchSlice } from './ISearch';

export const initialState: ISearchSlice = {
  status: 'idle',
  results: [],
  error: undefined,
  message: ""
};

export const searchSlice = createSlice({
  name: 'googleSearch',
  initialState,

  //Actions
  reducers: {},

  //async operations
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        let data = action.payload.data;

        if (data.success) {
          state.results = data.results;
          state.error = initialState.error;
        } else {
          state.results = initialState.results
          state.error = data.errors ? data.errors : data
        }
        state.status = 'idle';
      })
  },
});

//Actions
//export const { } = userSessionSlice.actions;

export const selectSearch = (state: RootState) => state.googleSearch;

export default searchSlice.reducer;
