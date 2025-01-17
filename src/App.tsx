import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#10ac84",
          },
        }}
      >
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      </ConfigProvider>
    </>
  );
}

export default App;
