import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceStateInterface {
  currentUser: Object | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserSliceStateInterface = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginFailure, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
