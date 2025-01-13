import { jwtDecode } from "jwt-decode";
export const tokenDecode = (token: string) => {
  return jwtDecode(token);
};
