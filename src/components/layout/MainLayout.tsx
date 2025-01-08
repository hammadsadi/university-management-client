import { Layout, Menu, MenuProps } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Dashboard",
  },
  {
    key: "2",
    label: "Users",
    children: [
      {
        key: "1.1",
        label: "Admin",
      },
      {
        key: "1.2",
        label: "Faculty",
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
            The Main content here....
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
