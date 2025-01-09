import { Layout, Menu, MenuProps } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
  },
  {
    key: "userManagement",
    label: "User Management",
    children: [
      {
        key: "create admin",
        label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
      },
      {
        key: "create faculty",
        label: <NavLink to="/admin/create-faculty">Create Facujlty</NavLink>,
      },
      {
        key: "create student",
        label: <NavLink to="/admin/create-student">Create Student</NavLink>,
      },
    ],
  },
  {
    key: "3",
    label: "Profile",
  },
  {
    key: "4",
    label: "Settings",
  },
];
const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className=""
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Islamic University</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Islamic University ©{new Date().getFullYear()} Developed by Hammad
          Sadi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
