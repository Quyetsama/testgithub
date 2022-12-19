import { createSlice } from '@reduxjs/toolkit';
import { loadMovie } from '../actions/movie.action';

const initialState = {
  movies: [],
  addModal: {
    visible: false
  },
  editModal: {
    visible: false,
    movie: null
  }
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setAddModal(state, action) {
      state.addModal = action.payload;
      return state;
    },
    setEditModal(state, action) {
      state.editModal = action.payload;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
    })
  }
});

export const {
  setAddModal,
  setEditModal
} = movieSlice.actions;

export default movieSlice.reducer;
