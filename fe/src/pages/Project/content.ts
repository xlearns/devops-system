import { MenuProps } from "antd";

export const environments = [
  {
    label: "java",
    value: "java",
  },
  {
    label: "node",
    value: "node",
  },
  {
    label: "python",
    value: "python",
  },
  {
    label: "golang",
    value: "golang",
  },
];

export const cicdList = [
  {
    label: "jenkins",
    value: "jenkins",
  },
  {
    label: "gitlab",
    value: "gitlab",
    disabled: true,
  },
];

export const columns = [
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "项目描述",
    dataIndex: "update",
    key: "update",
  },
];
export const modeItems: MenuProps["items"] = [
  {
    type: "group",
    label: "View",
    children: [
      {
        key: "card",
        label: "Cards",
      },
      {
        key: "table",
        label: "Table",
      },
    ],
  },
];
