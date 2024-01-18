import { Radio, RadioChangeEvent } from "antd";
import { useContext } from "react";
import { MyContext } from "../../context";
import { members } from "./constants";

export const UserSelect = () => {
  const onChange = (e: RadioChangeEvent) => {
    updateValue(e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { value, updateValue } = useContext(MyContext);

  return (
    <Radio.Group onChange={onChange} value={value}>
      {members.map((m) => (
        <Radio key={m} value={m}>
          {m}
        </Radio>
      ))}
    </Radio.Group>
  );
};
