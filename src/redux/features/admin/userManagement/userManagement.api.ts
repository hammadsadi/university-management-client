import { baseApi } from "../../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Admission Semester
    // getAllAdmissionSemester: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: any) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: TReduxResponse<TAcademicSemester[]>) => {
    //     return {
    //       data: response?.data,
    //       meta: response?.meta,
    //     };
    //   },
    // }),
    // Create New Admission Semester
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/user/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
