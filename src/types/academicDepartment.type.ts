export type TAcademicDepartmentRef = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _v: string;
};
export type TAcademicDepartment = {
  academicFaculty: TAcademicDepartmentRef;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
