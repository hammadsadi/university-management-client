import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://islamic-university-api.vercel.app/api/v1",
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
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
