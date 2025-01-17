import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputTypes = {
  type: string;
  placeHolder: string;
  name: string;
  label?: string;
};
const FormInput = ({ type, placeHolder, name, label }: TInputTypes) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} placeholder={placeHolder} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
