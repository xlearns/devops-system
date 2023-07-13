import type { FormInstance } from "@ant-design/pro-components";
import { RefObject } from "react";
import { IFormBase } from "./interface";
import { isFunction } from "@/utils/judgment";

export function resetFormOfKey(
  target: RefObject<FormInstance<IFormBase>>,
  arr: [string, (res: any) => any, (res: any) => any][]
) {
  const names = arr.map(([name, fn, val]) => {
    isFunction(fn) && fn(val);
    return name;
  });
  target?.current?.resetFields(names);
}
