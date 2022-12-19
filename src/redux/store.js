import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../redux/slices/auth.slice';
import { genreSlice } from '../redux/slices/genre.slice';
import { movieSlice } from '../redux/slices/movie.slice';


const reducers = combineReducers({
  auth: authSlice.reducer,
  genre: genreSlice.reducer,
  movie: movieSlice.reducer,
});


export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

