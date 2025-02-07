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
        console.log(params);
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
    //  Get All Courses
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["course"],
      transformResponse: (response: TReduxResponse<any>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    //  Get All Courses
    getCourseFaculties: builder.query({
      query: (id) => ({
        url: `/courses/${id}/get-faculties`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<any>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    // Create New Course
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    // Add Faculties
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAddRegisterSemesterMutation,
  useGetAllRegisterSemesterQuery,
  useUpdateRegisterSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddFacultiesMutation,
  useGetCourseFacultiesQuery,
} = courseManagementApi;
