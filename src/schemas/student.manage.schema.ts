import { z } from "zod";

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Father's contact number should be in the format XXX-XXX-XXXX"
    ),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Mother's contact number should be in the format XXX-XXX-XXXX"
    ),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Local guardian's contact number should be in the format XXX-XXX-XXXX"
    ),
  address: z.string(),
});

const studentSchema = z.object({
  name: z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
  }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth should be in YYYY-MM-DD format"
    ),
  bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  email: z.string().email(),
  contactNo: z.string().regex(/^\d{7}$/, "Contact number should be 7 digits"),
  emergencyContactNo: z
    .string()
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Emergency contact number should be in the format XXX-XXX-XXXX"
    ),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  admissionSemester: z.string(),
  academicDepartment: z.string(),
});

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export const studentDataSchema = z.object({
  password: passwordSchema,
  student: studentSchema,
});
