import { Button, Col, Flex } from "antd";
import IUForm from "../../../components/form/IUForm";
import FormInput from "../../../components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academic.management.schemas";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicFaculty = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
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
