import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import {
  selectCurrentToken,
  TUser,
  userLogout,
} from "../../redux/features/auth/authSlice";
import { tokenDecode } from "../../utils/tokenDecode";
type TProtectedRoutesProps = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoutes = ({ children, role }: TProtectedRoutesProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  let user;
  if (token) {
    user = tokenDecode(token);
  }
  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(userLogout());
    return <Navigate to="/login" replace={true} />;
  }
  console.log(user);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
