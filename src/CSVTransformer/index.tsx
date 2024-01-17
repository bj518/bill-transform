import { Card } from "antd";
import { AppleOutlined } from "@ant-design/icons";
import UploadFileBox from "./UploadFileBox";

export const CSVTransformer = () => {
  const data = [
    {
      icon: <AppleOutlined></AppleOutlined>,
      value: "wechat",
      children: <UploadFileBox type="wechat"></UploadFileBox>,
    },
    {
      icon: <AppleOutlined></AppleOutlined>,
      value: "alipay",
      children: <UploadFileBox type="alipay"></UploadFileBox>,
    },
  ];

  return (
    <div
      className="transform-container"
      style={{
        display: "flex",
        padding: "48px",
        justifyContent: "space-between",
      }}
    >
      {data.map((c) => (
        <Card key={c.value}>{c.children}</Card>
      ))}
    </div>
  );
};
