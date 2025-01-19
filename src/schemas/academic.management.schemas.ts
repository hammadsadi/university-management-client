import { z } from "zod";

export const admissionSemesterSchema = z.object({
  name: z.string({ required_error: "Please Select a Name" }),
  year: z.string({ required_error: "Please Select a Year" }),
  startMonth: z.string({ required_error: "Please Select a Start Month" }),
  endMonth: z.string({ required_error: "Please Select a End Month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please Inter Your Academic Faculty Name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please Inter Your Academic Faculty Name" }),
  academicFaculty: z.string({
    required_error: "Please Inter Valid Academic Department",
  }),
});