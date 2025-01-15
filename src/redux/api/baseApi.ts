import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Get Token From Redux State
    const token = (getState() as RootState).auth.token;
    // Set Header Token
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// Custom Base Query
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const tokenInfo = await res.json();
    const user = (api.getState() as RootState).auth.user;
    api.dispatch(setUser({ user, token: tokenInfo.data.accessToken }));
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
