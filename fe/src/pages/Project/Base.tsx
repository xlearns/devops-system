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
  formRef: RefObject<FormInstance<IFormBase>>;
  setBranchList: (args: any) => any;
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
];

const Base: React.FC<IPort> = (props) => {
  const { formRef, setBranchList, serveList, gitLabList, branchList } = props;

  function resetFormOfBase(
    arr: [string, (res: any) => any, (res: any) => any][]
  ) {
    resetFormOfKey(formRef, arr);
  }

  return (
    <StepsForm.StepForm
      formRef={formRef}
      name="base"
      title="基本配置"
      onFinish={async () => {
        return true;
      }}
      onValuesChange={async (changedValues) => {
        if (changedValues.gitlab) {
          const { value: gitlabValue } = changedValues.gitlab;
          resetFormOfBase([["branch", setBranchList, () => []]]);
          const { data } = await apiHttp.get<IRequest>("project/branchs", {
            id: gitlabValue,
          });

          if (data) {
            setBranchList(data);
          }
        }
      }}
    >
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
        name="env"
        label="环境"
        options={environments}
        placeholder="Please select"
        rules={[{ required: true }]}
      />
    </StepsForm.StepForm>
  );
};

export default Base;
