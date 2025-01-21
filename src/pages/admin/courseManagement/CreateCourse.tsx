/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUForm from "../../../components/form/IUForm";
import { Button, Col, Flex } from "antd";
import IUSelect from "../../../components/form/IUSelect";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";
import FormInput from "../../../components/form/FormInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/courseManagement/courseManagement";

const CreateCourse = () => {
  const { data: coursesData } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();
  // Academic Semester Registration Name Options
  const preRequisiteCoursesOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item?.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const DataCourse = {
      ...data,
      code: Number(data?.code),
      credits: Number(data?.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = await addCourse(DataCourse);
      console.log(res);
      if (res?.error) {
        toast.error((res?.error as TErrorTypes).data.message, { id: toastId });
      } else {
        toast.success("Semester Created Successful", { id: toastId });
      }
    } catch (error) {
      toast.error("Something Wron", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <IUForm onsubmit={onSubmit}>
          <FormInput
            type="text"
            name="title"
            label="Course Title"
            placeHolder="Inter Your Course Title Here"
          />
          <FormInput
            type="text"
            name="prefix"
            label="Course Prefix"
            placeHolder="Inter Course Prefix Here"
          />
          <FormInput
            type="text"
            name="credits"
            label="Course Credits"
            placeHolder="Inter Course Credits Here"
          />
          <FormInput
            type="text"
            name="code"
            label="Course Code"
            placeHolder="Inter Course Code Here"
          />
          <IUSelect
            mode="multiple"
            label="Select PreRequisite Course"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
