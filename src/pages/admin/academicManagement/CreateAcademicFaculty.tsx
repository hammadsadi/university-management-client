import { Button, Col, Flex } from "antd";
import IUForm from "../../../components/form/IUForm";
import FormInput from "../../../components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academic.management.schemas";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFaculty/academicFaculty.api";
import { toast } from "sonner";
import { TErrorTypes } from "../../../types/types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Createing Academic Faculty...");
    try {
      const res = await addAcademicFaculty(data);
      console.log("Inside Success", res);
      if (res.error) {
        toast.error((res?.error as TErrorTypes).data.message, { id: toastId });
      } else {
        toast.success("Semester Created Successful", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <IUForm
          onsubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <FormInput
            type="text"
            placeHolder="Academic Faculty Name"
            name="name"
            label="Academic Faculty Name"
          />

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </IUForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
