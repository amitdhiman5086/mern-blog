import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSucess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteUserSuccess: (state) => {
      (state.loading = false), (state.currentUser = null);
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      (state.error = action.payload), (state.loading = true);
    },
    signOutSuccess: (state) => {
      (state.currentUser = null), (state.loading = false), (state.error = null);
    },
  },
});

export const {
  updateFailure,
  updateStart,
  updateSuccess,
  signInFailure,
  signInSucess,
  signOutSuccess,
  signInStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} = userSlice.actions;
export default userSlice.reducer;
