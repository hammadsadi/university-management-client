/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUForm from "../../../components/form/IUForm";
import { Button, Col, Flex } from "antd";
import IUSelect from "../../../components/form/IUSelect";
import { nameOptions } from "../../../constants/semester";
import { monthsOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionSemesterSchema } from "../../../schemas/academic.management.schemas";
import { useAddAdmissionSemesterMutation } from "../../../redux/features/admin/academic.management.api";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";

// Years Options
const currentYear = new Date().getFullYear();
const yearsOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAdmissionSemester = () => {
  const [addAdmissionSemester] = useAddAdmissionSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
      year: data.year,
    };
    try {
      const res = await addAdmissionSemester(semesterData);
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
          resolver={zodResolver(admissionSemesterSchema)}
        >
          <IUSelect label="Name" name="name" options={nameOptions} />
          <IUSelect label="Year" name="year" options={yearsOptions} />
          <IUSelect
            label="Start Month"
            name="startMonth"
            options={monthsOptions}
          />
          <IUSelect label="End Month" name="endMonth" options={monthsOptions} />

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default CreateAdmissionSemester;
