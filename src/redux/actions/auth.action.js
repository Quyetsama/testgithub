import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';

export const doLogin = createAsyncThunk(
  'auth/login',
  async ({email, password}, thunkAPI) => {
    try {
      const data = await ApiService.login(email, password);
      return data;
    } catch (error) {
      console.log('Error doLogin', error.response.data);
      alert(error.response.data.message)
      return thunkAPI.rejectWithValue('No user found');
    }
  },
);