import { TReduxResponse, TStudent } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Students
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TStudent[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create New Student
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
