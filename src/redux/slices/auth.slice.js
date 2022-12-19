import { createSlice } from '@reduxjs/toolkit';
import { doLogin } from '../actions/auth.action';

const initialState = {
  isLogin: false,
  admin: {},
  access_token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state = initialState;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.isLogin = true;
      state.admin = action.payload.admin;
      state.access_token = action.payload.access_token;
    })
  }
});

export const {
  logOut
} = authSlice.actions;

export default authSlice.reducer;
