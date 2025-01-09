import { ReactNode } from "react";

export type TUserSidebar = {
  key: string;
  label: ReactNode;
  children?: TUserSidebar[];
};

export type TUserRoutesItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserRoutesItems[];
};
