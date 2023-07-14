import type { FormInstance } from "@ant-design/pro-components";
import type { IFormBase } from "./interface";
import type { RefObject } from "react";
import type { IProject } from "@/models/global";
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { resetFormOfKey } from "./utils";
import { IRequest, apiHttp } from "@/utils/http";
import { IServeList } from "../interface";

interface IPort {
  serveList: IServeList[];
  gitLabList: IProject[];
  branchList: IProject[];
}

const environments = [
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

const cicdList = [
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

const Base: React.FC<IPort> = (props) => {
  const { serveList, gitLabList, branchList } = props;

  return (
    <>
      <ProFormText
        name="name"
        label="名称"
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="description"
        label="描述"
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="host"
        label="选择服务器"
        options={serveList.map(({ host }) => {
          return {
            label: host,
            value: host,
          };
        })}
        placeholder="Please select"
        rules={[{ required: false }]}
      />

      <ProFormSelect.SearchSelect
        mode="single"
        name="gitlab"
        label="选择gitlab仓库"
        options={gitLabList.map(({ id, name, url }) => {
          return {
            label: name,
            value: id,
            url,
          };
        })}
        fieldProps={{
          optionItemRender(item: { label: string; url: string }) {
            return (
              <div title={item.url}>
                <span style={{ color: "red" }}>{item.label}</span> - {item.url}
              </div>
            );
          },
        }}
        placeholder="Please select"
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="branch"
        label="选择分支"
        options={branchList.map(({ name, id }) => {
          return {
            label: name,
            value: id,
          };
        })}
        placeholder="Please select"
        rules={[{ required: true }]}
      />

      <ProFormSelect
        name="cicd"
        label="CI/CD"
        options={cicdList.map(({ label, value, disabled }) => {
          return {
            label,
            value,
            disabled,
          };
        })}
        placeholder="Please select"
        rules={[{ required: true }]}
      />

      <ProFormSelect
        name="env"
        label="环境"
        options={environments}
        placeholder="Please select"
        rules={[{ required: true }]}
      />
    </>
  );
};

export default Base;
