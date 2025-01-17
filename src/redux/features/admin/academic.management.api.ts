import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    getAllAdmissionSemester: builder.query({
      query: () => ({
        url: "/admission-semesters/all-admission-semester",
        method: "GET",
      }),
    }),
    // Create New Admission Semester
    addAdmissionSemester: builder.mutation({
      query: (data) => ({
        url: "/admission-semesters/create-admission-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAdmissionSemesterQuery,
  useAddAdmissionSemesterMutation,
} = academicManagementApi;
