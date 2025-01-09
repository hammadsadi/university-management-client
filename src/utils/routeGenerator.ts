import { ReactNode } from "react";

type TUserRoutes = {
  path: string;
  element: ReactNode;
};
type TUserRoutesItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserRoutesItems[];
};
export const routeGenerator = (routeItems: TUserRoutesItems[]) => {
  const routes = routeItems.reduce((acc: TUserRoutes[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path as string,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);

  return routes;
};
