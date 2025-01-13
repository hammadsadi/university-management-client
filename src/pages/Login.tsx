import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2025010004",
      password: "Sadi123456",
    },
  });
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  const onsubmit = async (data) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    dispatch(setUser({ user: {}, token: res.data.accessToken }));
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
