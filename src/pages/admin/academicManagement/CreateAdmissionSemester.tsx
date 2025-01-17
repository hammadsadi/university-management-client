import { FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import IUForm from "../../../components/form/IUForm";
import { Button } from "antd";

const CreateAdmissionSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <IUForm onsubmit={onSubmit}>
        <FormInput
          name="name"
          type="text"
          placeHolder="Admission Semester Name"
          label="Admission Semester Name"
        />
        <Button htmlType="submit" type="primary">
          Create
        </Button>
      </IUForm>
    </div>
  );
};

export default CreateAdmissionSemester;
