/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

// User Data Type
type TUserInitType = {
  user: null | TUser;
  token: null | string;
};

// initialState Data
const initialState: TUserInitType = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    userLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, userLogout } = authSlice.actions;
export default authSlice.reducer;
// Get Current Token
export const useCurrentToken = (state: RootState) => state.auth.token;
// Get Current User
export const useCurrentUser = (state: RootState) => state.auth.user;
