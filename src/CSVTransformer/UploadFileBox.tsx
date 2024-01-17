import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import Papa, { ParseResult } from "papaparse";
import React from "react";
import { UploadType, aliHandler, configs, parseConfigs, title } from "./config";
const { Dragger } = Upload;

const UploadFileBox: React.FC<{ type: UploadType }> = ({ type }) => {
  const config = configs[type];
  const parseConfig = parseConfigs[type];

  const formatHandler = (data: string[][]) => {
    return data
      .filter((_, index) => index >= config.startIndex)
      .map((value) => {
        return [
          value[config.nameIdx],
          value[config.timeIndex],
          value[config.valueIndex],
          ...new Array(4).fill(null),
          value[config.typeIdx],
        ];
      });
  };

  function handleDownloadCSV(data: string[][]) {
    const csv = Papa.unparse(data);
    const str = data[1][1];
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_ime_${str}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onParseSuccess = (res: ParseResult<string[]>) => {
    const { data } = res;

    let expectedData = type === "wechat" ? data : aliHandler(data);
    expectedData = [...formatHandler(expectedData)];
    expectedData.unshift(title);

    handleDownloadCSV(expectedData);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { file } = info;
      const { originFileObj } = file;
      if (!originFileObj) return;

      Papa.parse(originFileObj, {
        complete: onParseSuccess,
        ...parseConfig,
      });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger
      showUploadList={false}
      customRequest={() => {}}
      accept=".csv"
      {...props}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-hint">把{type}csv拖到这里哦</p>
    </Dragger>
  );
};

export default UploadFileBox;
