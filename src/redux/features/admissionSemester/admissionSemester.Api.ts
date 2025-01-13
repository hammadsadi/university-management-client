import { baseApi } from "../../api/baseApi";

const admissionSemesterBaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmissionSemester: builder.query({
      query: () => ({
        url: "/admission-semesters/all-admission-semester",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAdmissionSemesterQuery } = admissionSemesterBaseApi;
