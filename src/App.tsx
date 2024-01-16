import { ConfigProvider } from "antd";
import "./App.css";
import { CSVTransformer } from "./CSVTransformer";

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
        <CSVTransformer></CSVTransformer>
      </ConfigProvider>
    </>
  );
}

export default App;
