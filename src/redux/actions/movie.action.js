import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';

export const loadMovie = createAsyncThunk(
  'movie/load',
  async (_, thunkAPI) => {
    try {
      const data = await ApiService.getMovies();
      return data;
    } catch (error) {
      console.log('Error loadMovie', error.response.data);
    }
  },
);

export const createMovie = createAsyncThunk(
  'movie/create',
  async ({movie, episodes}, thunkAPI) => {
    try {
      await ApiService.createMovie(movie, episodes);
      thunkAPI.dispatch(loadMovie());
    } catch (error) {
      console.log('Error createMovie', error.response.data);
    }
  },
);

export const deleteMovie = createAsyncThunk(
  'movie/delete',
  async (id, thunkAPI) => {
    try {
      await ApiService.deleteMovie(id);
      thunkAPI.dispatch(loadMovie());
    } catch (error) {
      console.log('Error deleteMovie', error.response.data);
    }
  },
);

export const addEpisode= createAsyncThunk(
  'movie/add-episode',
  async ({id, episode}, thunkAPI) => {
    try {
      await ApiService.addEpisode(id, episode);
      thunkAPI.dispatch(loadMovie());
    } catch (error) {
      console.log('Error editGenre', error.response.data);
    }
  },
);

export const editEpisode= createAsyncThunk(
  'movie/edit-episode',
  async ({id, episode}, thunkAPI) => {
    try {
      await ApiService.editEpisode(id, episode);
      thunkAPI.dispatch(loadMovie());
    } catch (error) {
      console.log('Error editGenre', error.response.data);
    }
  },
);

export const editMovie = createAsyncThunk(
  'movie/edit',
  async ({id, movie}, thunkAPI) => {
    try {
      await ApiService.editMovie(id, movie);
      thunkAPI.dispatch(loadMovie());
    } catch (error) {
      console.log('Error editMovie', error.response.data);
    }
  },
);