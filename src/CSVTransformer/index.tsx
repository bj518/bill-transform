import { Card, Tabs } from "antd";
import { AppleOutlined } from "@ant-design/icons";
import UploadFileBox from "./UploadFileBox";

export const CSVTransformer = () => {
  const data = [
    {
      icon: <AppleOutlined></AppleOutlined>,
      label: "wechat",
      value: "wechat",
      children: (
        <Card>
          <UploadFileBox></UploadFileBox>
        </Card>
      ),
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="2"
        items={data.map((val) => {
          return {
            key: val.value,
            label: `Tab ${val.label}`,
            icon: val.children,
          };
        })}
      />
    </div>
  );
};
