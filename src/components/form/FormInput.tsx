import { Input } from "antd";
import { Controller } from "react-hook-form";
type TInputTypes = {
  type: string;
  placeHolder: string;
  name: string;
  label?: string;
};
const FormInput = ({ type, placeHolder, name, label }: TInputTypes) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input {...field} type={type} placeholder={placeHolder} />
        )}
      />
    </div>
  );
};

export default FormInput;
