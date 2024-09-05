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
  },
});

export const { signInFailure, signInSucess, signInStart } = userSlice.actions;
export default userSlice.reducer;
