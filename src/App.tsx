import { ConfigProvider, Layout } from "antd";
import "./App.css";
import { CSVTransformer } from "./components/CSVTransformer";
import { Content } from "antd/es/layout/layout";
import MyProvider from "./context";
import { UserSelect } from "./components/userSelect";

function App() {
  const theme = {
    token: {
      colorPrimary: "#b6c4b6",
      colorInfo: "#b6c4b6",
      colorWarning: "#c9957a",
      colorError: "#af5554",
      colorSuccess: "#148426",
      colorBgBase: "#d1d9d4",
      colorTextBase: "#3a3636",
    },
  };
  return (
    <>
      <ConfigProvider theme={theme}>
        <Layout>
          <MyProvider>
            <Content style={{ padding: "48px" }}>
              <UserSelect></UserSelect>
              <CSVTransformer></CSVTransformer>
            </Content>
          </MyProvider>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
