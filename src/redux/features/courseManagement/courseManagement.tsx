// const courseManagementApi
import { TReduxResponse, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    getAllRegisterSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TReduxResponse<TSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create New Register Semester
    addRegisterSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    // Update Register Semester
    updateRegisterSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args?.data,
      }),
      invalidatesTags: ["semester"],
    }),
  }),
});

export const {
  useAddRegisterSemesterMutation,
  useGetAllRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
} = courseManagementApi;
