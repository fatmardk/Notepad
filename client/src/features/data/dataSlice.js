import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dataService from './dataService';

const initialState = {
  notlar: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  mesaj: ''
};

export const createNot = createAsyncThunk('notlar/create', async (notData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log('Token:', token); // Token'ı konsolda yazdırıyoruz
    if (!token) {
      throw new Error('Token bulunamadı');
    }
    const response = await dataService.createNot(notData, token);
    console.log('API Response:', response); // Hata ayıklama için ekledik
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log('Error:', message); // Hata ayıklama için ekledik
    return thunkAPI.rejectWithValue(message);
  }
});

export const getNot = createAsyncThunk('notlar/all', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await dataService.getNot(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteNot = createAsyncThunk('notlar/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await dataService.deleteNot(id,token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



const notSlice = createSlice({
  name: 'notlar',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notlar.unshift(action.payload);
      })
      .addCase(createNot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.mesaj = action.payload;
      })
      .addCase(getNot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notlar = action.payload; 
      })
      .addCase(getNot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.mesaj = action.payload;
      })
      .addCase(deleteNot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notlar = state.notlar.filter((not)=>not._id !== action.payload.id)
      })
      .addCase(deleteNot.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.mesaj = action.payload;
      });
  }
});

export const { reset } = notSlice.actions;

export default notSlice.reducer;
