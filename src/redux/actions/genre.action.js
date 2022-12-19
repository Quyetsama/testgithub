import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';

export const loadGenre = createAsyncThunk(
  'genre/load',
  async (_, thunkAPI) => {
    try {
      const data = await ApiService.getGenres();
      return data;
    } catch (error) {
      console.log('Error loadGenre', error.response.data);
    }
  },
);

export const createGenre = createAsyncThunk(
  'genre/create',
  async ({name, image}, thunkAPI) => {
    try {
      await ApiService.createGenre(name, image);
      thunkAPI.dispatch(loadGenre());
    } catch (error) {
      console.log('Error createGenre', error.response.data);
    }
  },
);

export const deleteGenre = createAsyncThunk(
  'genre/delete',
  async (id, thunkAPI) => {
    try {
      await ApiService.deleteGenre(id);
      thunkAPI.dispatch(loadGenre());
    } catch (error) {
      console.log('Error deleteGenre', error.response.data);
    }
  },
);

export const editGenre = createAsyncThunk(
  'genre/edit',
  async ({id, genre}, thunkAPI) => {
    try {
      await ApiService.editGenre(id, genre);
      thunkAPI.dispatch(loadGenre());
    } catch (error) {
      console.log('Error editGenre', error.response.data);
    }
  },
);