// const courseManagementApi
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    //  getAllAdmissionSemester: builder.query({
    //    query: (args) => {
    //      const params = new URLSearchParams();
    //      if (args) {
    //        args.forEach((item: any) => {
    //          params.append(item.name, item.value);
    //        });
    //      }
    //      return {
    //        url: "/academic-semesters",
    //        method: "GET",
    //        params: params,
    //      };
    //    },
    //    transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
    //      return {
    //        data: response?.data,
    //        meta: response?.meta,
    //      };
    //    },
    //  }),
    // Create New Register Semester
    addRegisterSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddRegisterSemesterMutation } = courseManagementApi;
