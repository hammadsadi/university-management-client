import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelect = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
};
const IUSelect = ({ label, name, options, disabled }: TFormSelect) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default IUSelect;
