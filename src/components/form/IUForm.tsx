import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormSubmit = {
  onsubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};
const IUForm = ({ onsubmit, children }: TFormSubmit) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onsubmit)}>
        {children}
      </Form>
      ;
    </FormProvider>
  );
};

export default IUForm;
