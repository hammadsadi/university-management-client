import { Button, Col, Flex } from "antd";
import IUForm from "../../../components/form/IUForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/form/FormInput";
import { academicDepartmentSchema } from "../../../schemas/academic.management.schemas";
import { FieldValues, SubmitHandler } from "react-hook-form";
import IUSelect from "../../../components/form/IUSelect";

const CreateAcademicDepartment = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  const academicFacultyOptions = [
    {
      value: "01",
      label: "Autumn",
    },
  ];
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
            options={academicFacultyOptions}
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
