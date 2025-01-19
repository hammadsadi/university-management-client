import { TReduxResponse } from "../../../../types";
import { TAcademicSemester } from "../../../../types/academic.semester.types";
import { baseApi } from "../../../api/baseApi";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    getAllAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create New Academic Faculty
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllAcademicFacultyQuery, useAddAcademicFacultyMutation } =
  academicFacultyApi;
