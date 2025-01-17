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
      <form onSubmit={methods.handleSubmit(onsubmit)}>{children}</form>;
    </FormProvider>
  );
};

export default IUForm;
