import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import Papa, { ParseResult } from "papaparse";
import React from "react";

const { Dragger } = Upload;
const startIndex = 17;

const timeIndex = 0;
const valueIndex = 5;
const typeIdx = 4;
const nameIdx = 2;

const onParseSuccess = (res: ParseResult<string[]>) => {
  const { data } = res;
  const expectedData = data
    .filter((_, index) => index >= startIndex)
    .map((value) => {
      return [
        value[nameIdx],
        value[timeIndex],
        value[valueIndex],
        "",
        "",
        "",
        "",
        value[typeIdx],
      ];
    });
  console.log(expectedData);
  expectedData.unshift(["名称", "时间", "金额", "", "", "", "", "类型"]);
  const csv = Papa.unparse(expectedData);
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exported_data.csv";
  // 将链接添加到文档并触发下载
  document.body.appendChild(link);
  link.click();

  // 清理创建的元素
  document.body.removeChild(link);
};

const props: UploadProps = {
  name: "file",
  multiple: false,
  onChange(info) {
    console.log(info);
    const { file } = info;
    const { originFileObj } = file;
    if (!originFileObj) return;
    Papa.parse(originFileObj, {
      complete: onParseSuccess,
    });
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadFileBox: React.FC = () => (
  <Dragger customRequest={() => {}} accept=".csv" {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-hint">把csv拖到这里哦</p>
  </Dragger>
);

export default UploadFileBox;
