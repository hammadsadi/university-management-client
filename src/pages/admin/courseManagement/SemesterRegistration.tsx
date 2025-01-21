/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUForm from "../../../components/form/IUForm";
import { Button, Col, Flex } from "antd";
import IUSelect from "../../../components/form/IUSelect";
import { nameOptions } from "../../../constants/semester";
import { courseStatus } from "../../../constants/global";
import { useGetAllAdmissionSemesterQuery } from "../../../redux/features/admin/academic.management.api";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";
import IUDatePicker from "../../../components/form/IUDatePicker";
import FormInput from "../../../components/form/FormInput";
import { useAddRegisterSemesterMutation } from "../../../redux/features/courseManagement/courseManagement";

const SemesterRegistration = () => {
  const { data: admissionSemesterData } = useGetAllAdmissionSemesterQuery([
    { name: "sort", value: "year" },
  ]);
  const [addSemester] = useAddRegisterSemesterMutation();
  // Academic Semester Registration Name Options
  const academicSemesterOption = admissionSemesterData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));
  // Academic Semester Registration Name Options
  const academicSemesterStatusOption = courseStatus.map((item) => ({
    value: item,
    label: item,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);
    try {
      const res = await addSemester(semesterData);
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
        <IUForm
          onsubmit={onSubmit}
          // resolver={zodResolver(admissionSemesterSchema)}
        >
          <IUSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOption}
          />
          <IUSelect
            label="Status"
            name="status"
            options={academicSemesterStatusOption}
          />
          <IUDatePicker name="startDate" label="Start Date" />
          <IUDatePicker name="endDate" label="End Date" />
          <FormInput
            type="text"
            name="minCredit"
            label="Min Credit"
            placeHolder="Inter Min Credit Here"
          />
          <FormInput
            type="text"
            name="maxCredit"
            label="Max Credit"
            placeHolder="Inter Max Credit Here"
          />
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
