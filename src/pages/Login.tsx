/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { tokenDecode } from "../utils/tokenDecode";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import IUForm from "../components/form/IUForm";
import FormInput from "../components/form/FormInput";

type TErrorTypes = {
  data: {
    success: string;
    message: string;
    errorResources?: any;
  };
};
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const onsubmit = async (data: FieldValues) => {
    console.log(data);
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
      toast.error((error as TErrorTypes).data?.message, { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="login-item">
        <IUForm onsubmit={onsubmit}>
          <FormInput
            type="text"
            placeHolder="Inter Your ID"
            name="userId"
            label="ID:"
          />
          <FormInput
            type="text"
            placeHolder="Inter Your Password"
            name="password"
            label="Password"
          />
          <Button htmlType="submit">Login</Button>
        </IUForm>
      </div>
    </Row>
  );
};

export default Login;
