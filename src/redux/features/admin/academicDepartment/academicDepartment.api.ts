import { TReduxResponse } from "../../../../types";
import { TAcademicDepartment } from "../../../../types/academicDepartment.type";
import { baseApi } from "../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Academic Department
    getAllAcademicDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TAcademicDepartment[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create New Academic Department
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
} = academicDepartmentApi;
