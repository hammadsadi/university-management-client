import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2025010004",
      password: "Sadi123456",
    },
  });
  const [login, { data, error }] = useLoginMutation();
  console.log("Data =>", data);
  console.log("Error =>", error);
  const onsubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    await login(userInfo);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input type="text" placeholder="User Id" {...register("userId")} />
        <input
          type="text"
          placeholder="User Password"
          {...register("password")}
        />
        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
