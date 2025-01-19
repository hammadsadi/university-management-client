import { Button, Col, Flex } from "antd";
import IUForm from "../../../components/form/IUForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/form/FormInput";
import { academicDepartmentSchema } from "../../../schemas/academic.management.schemas";
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUSelect from "../../../components/form/IUSelect";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicFaculty/academicFaculty.api";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academicDepartment/academicDepartment.api";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAllAcademicFacultyQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Department...");
    try {
      const res = await addAcademicDepartment(data);
      if (res?.error) {
        toast.error((res?.error as TErrorTypes).data.message, { id: toastId });
      } else {
        toast.success("Academic Department Created Successful", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set Academic Faculty
  const departmenNameOptions = facultyData?.data?.map(({ name, _id }) => ({
    value: _id,
    label: name,
  }));
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <IUForm
          onsubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <FormInput
            type="text"
            placeHolder="Academic Department Name"
            name="name"
            label="Academic Department Name"
          />
          <IUSelect
            label="Select Academic Faculty"
            name="academicFaculty"
            options={departmenNameOptions}
          />

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
