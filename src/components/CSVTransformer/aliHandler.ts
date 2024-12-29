import { aliConfig } from "./config";

export const aliHandler = (data: string[][]) => {
  const expectedData = data[22];
  const result: string[][] = [];
  let currentSegment: string[] = [];
  const map = new Map();

  expectedData.forEach((item) => {
    if (item.includes("\n")) {
      const segmentWithoutNewline = item.replace("\n", "");
      result.push([...currentSegment]);
      currentSegment = [segmentWithoutNewline];
    } else {
      currentSegment.push(item);
    }
  });

  if (currentSegment.length > 0) {
    result.push([...currentSegment]);
  }
  const da: string[][] = [];

  result.forEach((row) => {
    const name = row[aliConfig.nameIdx] ?? "";
    let value = row[aliConfig.valueIndex] ?? 0;

    if (name.indexOf("余额宝") === -1) {
      if (name.indexOf("退款") !== -1) {
        const n = name.split("-")[1];
        map.set(n, value);
      } else if (map.has(name)) {
        value = String((Number(value) - Number(map.get(name))).toFixed(2));
        if (value !== "0.00") {
          row[aliConfig.valueIndex] = value;
          da.push(row);
        }
      } else {
        da.push(row);
      }
    }
  });

  return da;
};
