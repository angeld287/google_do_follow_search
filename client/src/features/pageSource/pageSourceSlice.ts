import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPageSourceAsync } from './asyncThunks';
import { IPageSourceSlice } from './IPageSource';

export const initialState: IPageSourceSlice = {
  status: 'idle',
  results: null,
  error: undefined,
  message: ""
};

export const pageSourceSlice = createSlice({
  name: 'pageSource',
  initialState,

  //Actions
  reducers: {},

  //async operations
  extraReducers: (builder) => {
    builder
      .addCase(getPageSourceAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getPageSourceAsync.fulfilled, (state, action) => {
        let data = action.payload.data;

        if (data.success) {
          state.results = {
            statusCode: data.response.statusCode,
            body: data.response.body
          };
          state.error = initialState.error;
        } else {
          state.results = initialState.results
          state.error = data.errors ? data.errors : data
        }
        state.status = 'idle';
      })
      .addCase(getPageSourceAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

//Actions
//export const { } = userSessionSlice.actions;

export const selectPageSource = (state: RootState) => state.pageSource;

export default pageSourceSlice.reducer;
