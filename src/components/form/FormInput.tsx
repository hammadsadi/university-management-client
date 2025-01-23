import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputTypes = {
  type: string;
  placeHolder: string;
  name: string;
  label?: string;
  disable?: boolean;
};
const FormInput = ({
  type,
  placeHolder,
  name,
  label,
  disable,
}: TInputTypes) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              placeholder={placeHolder}
              disabled={disable}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default FormInput;
