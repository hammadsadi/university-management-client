/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUForm from "../../../components/form/IUForm";
import { Button, Col, Flex } from "antd";
import IUSelect from "../../../components/form/IUSelect";
import { courseStatus, DaysList } from "../../../constants/global";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academic.management.api";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";
import FormInput from "../../../components/form/FormInput";
import IUSelectWithWatch from "../../../components/form/IUSelectWithWatch";
import { useState } from "react";
import {
  useGetAllCoursesQuery,
  useGetAllRegisterSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/courseManagement/courseManagement";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicDepartment/academicDepartment.api";
import IUTimePicker from "../../../components/form/IUTimePicker";

const OfferCourse = () => {
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  // Get All Courses
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const [courseId, setCourseId] = useState("");
  // Get Course Faculties
  const { data: courseFaculties, isFetching: courseFacultiesFatching } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });
  // Semester Registration
  const { data: semesterRegisterData } =
    useGetAllRegisterSemesterQuery(undefined);
  // Academic Department
  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);
  // Academic Semester Registration Name Options
  const academicFacultiesOption = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Course Faculties Name Options
  const courseFacultiesOption = courseFaculties?.data?.faculties?.map(
    (item) => ({
      value: item._id,
      label: item.fullName,
    })
  );

  // Course Name Options
  const courseNameOption = courseData?.data?.map((item) => ({
    value: item._id,
    label: item?.title,
  }));

  // Academic Semester Registration Name Options
  const registerSemesterNameOption = semesterRegisterData?.data?.map(
    (item) => ({
      value: item._id,
      label: item?.academicSemester?.name,
    })
  );

  // OfferCourse Day Name Options
  const offerCourseDaysNameOption = DaysList.map((item) => ({
    value: item,
    label: item,
  }));

  // Academic Department Name Options
  const academicDepartmentNameOption = academicDepartmentData?.data?.map(
    (item) => ({
      value: item?._id,
      label: item?.name,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const offerCourseData = {
      ...data,
    };

    console.log(offerCourseData);
    // try {
    //   const res = await addSemester(semesterData);
    //   if (res?.error) {
    //     toast.error((res?.error as TErrorTypes).data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester Created Successful", { id: toastId });
    //   }
    // } catch (error) {
    //   toast.error("Something Wron", { id: toastId });
    // }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <IUForm onsubmit={onSubmit}>
          <IUSelect
            options={registerSemesterNameOption}
            name="semesterRegistration"
            label="Semester Registration"
          />
          <IUSelect
            label="Academic Faculties"
            name="academicFaculties"
            options={academicFacultiesOption}
          />
          <IUSelect
            options={academicDepartmentNameOption}
            name="academicDepartment"
            label="Academic Department"
          />
          <IUSelectWithWatch
            onValueChange={setCourseId}
            options={courseNameOption}
            name="course"
            label="Course"
          />
          <IUSelect
            disabled={!courseId || courseFacultiesFatching}
            options={courseFacultiesOption}
            name="faculty"
            label="Faculty"
          />
          <FormInput
            type="text"
            name="minCredit"
            label="Min Credit"
            placeHolder="Inter Min Credit Here"
          />
          <FormInput
            type="text"
            name="maxCapacity"
            label="Max Capacity"
            placeHolder="Inter Max Capacity Here"
          />
          <FormInput
            type="text"
            name="section"
            label="Section"
            placeHolder="Inter Section Here"
          />
          <IUSelect
            options={offerCourseDaysNameOption}
            mode="multiple"
            name="days"
            label="Days"
          />
          <IUTimePicker name="startTime" label="Start Time" />
          <IUTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
