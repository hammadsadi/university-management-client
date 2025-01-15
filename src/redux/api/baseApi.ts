import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

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
  console.log(result.error);
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
