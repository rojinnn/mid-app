import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  initialLoading: true,
  user: null,
  requestingLogin: false,
  requestLoginSuccess: false,
  requestingUpdateProfile: false,
  requestUpdateProfileSuccess: false,
  loginError: {},
  updateProfileError: {},
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    init(state, action) {
      state.initialLoading = false;
      state.user = action.payload;
    },
    logOut(state, action) {
      state.user = {};
    },
    loginActionn(state, action) {
     // state.user = {...state.user};
      state.requestingLogin = true;
      state.requestLoginSuccess = false;
    },
    loginSuccessActionn(state, action) {
      state.requestingLogin = false;
      state.requestLoginSuccess = true;
      state.user = action.payload;
    },
    loginErrorActionn(state, action) {
      // state.user = {...state.user};
      state.requestingLogin = false;
      state.requestLoginSuccess = false;
      state.loginError = action.payload;
    },

    updateProfile(state, action) {
      state.user = {...state.user};
      state.requestingUpdateProfile = true;
      state.requestUpdateProfileSuccess = false;
    },
    updateProfileSuccess(state, action) {
      state.requestingUpdateProfile = false;
      state.requestUpdateProfileSuccess = true;
      state.user = {...state.user, ...action.payload};
    },
    updateProfileError(state, action) {
      state.user = {...state.user};
      state.requestingUpdateProfile = false;
      state.requestUpdateProfileSuccess = false;
      state.updateProfileError = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const {
  init,
  logOut,
  setUser,
  loginActionn,
  loginSuccessActionn,
  loginErrorActionn,
  updateProfile,
  updateProfileSuccess,
  updateProfileError,
} = userSlice.actions;
export default userSlice.reducer;
