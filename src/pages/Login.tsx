import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { tokenDecode } from "../utils/tokenDecode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2025010004",
      password: "Sadi123456",
    },
  });
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loging In");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = tokenDecode(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Loging Success", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Loging Faield", { id: toastId });
    }
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
