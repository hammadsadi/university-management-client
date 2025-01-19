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
  resolver?: any;
};
type TFormConfig = {
  resolver?: any;
};
const IUForm = ({ onsubmit, children, resolver }: TFormSubmit) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onsubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
      ;
    </FormProvider>
  );
};

export default IUForm;
