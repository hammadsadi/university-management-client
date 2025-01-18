import { TReduxResponse } from "../../../types";
import { TAcademicSemester } from "../../../types/academic.semester.types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    getAllAdmissionSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create New Admission Semester
    addAdmissionSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
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
