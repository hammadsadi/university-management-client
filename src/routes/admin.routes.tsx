import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFacujlty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

type TAdminRoutes = {
  path: string;
  element: ReactNode;
};
const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFacujlty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

// Programitical Way
export const adminRoutes = adminPaths.reduce((acc: TAdminRoutes[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

// Hard Coded Way
// export const adminPaths = [
//   {
//     index: true,
//     element: <AdminDashboard />,
//   },
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFacujlty />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
// ];
