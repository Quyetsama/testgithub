import { createSlice } from '@reduxjs/toolkit';
import { createGenre, loadGenre } from '../actions/genre.action';

const initialState = {
  genres: [],
  addModal: {
    visible: false
  },
  editModal: {
    visible: false,
    genre: null
  }
};

export const genreSlice = createSlice({
  name: 'genre',
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
    builder.addCase(loadGenre.fulfilled, (state, action) => {
      state.genres = action.payload;
    })
  }
});

export const {
  setAddModal,
  setEditModal
} = genreSlice.actions;

export default genreSlice.reducer;
