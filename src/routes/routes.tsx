import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoutes role="faculty">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoutes role="student">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(studentPaths),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes role="admin">
        <App />
      </ProtectedRoutes>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
]);

export default routes;
