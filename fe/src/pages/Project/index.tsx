import NoData from "@/components/NoData";
import { formatTime } from "@/utils/format";
import { MoreOutlined } from "@ant-design/icons";
import {
  CheckCard,
  ModalForm,
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { useModel, useRequest } from "@umijs/max";
import type { MenuProps } from "antd";
import { Button, Col, Dropdown, FormInstance, Modal, Row, Table } from "antd";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { apiHttp } from "@/utils/http";
import type { IRequest } from "@/utils/http";
import type { IServeList } from "@/pages/interface";
import CodeMirror from "@uiw/react-codemirror";
import { isFunction } from "@/utils/judgment";

interface IFormBase {
  host: string;
  gitlab: string;
  branch: string;
}

const items: MenuProps["items"] = [
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

const columns = [
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "更新时间",
    dataIndex: "update",
    key: "update",
  },
];

const code = `pipeline {
  agent any
  stages {
      stage('Hello') {
          steps {
              echo 'Hello World'
          }
      }
  }
}
`;

function isHasData(data: unknown[]) {
  if (!Array.isArray(data)) return;
  return data.length > 0 ? true : false;
}

function useListType() {
  const [type, setType] = useState("card");
  const changeListType: MenuProps["onClick"] = (e) => {
    const { key } = e;
    setType(key);
  };
  return {
    changeListType,
    type,
  };
}

const Project: React.FC<unknown> = () => {
  const { project, setProject } = useModel("global");
  const [gitLabList, setGitLabList] = useState<typeof project>([]);
  const [serveList, setServeList] = useState<IServeList[]>([]);
  const [branchList, setBranchList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { type, changeListType } = useListType();
  const formRef = useRef<FormInstance<IFormBase>>(null);

  const { run: getGitlabProjectAll } = useRequest(
    () => {
      return apiHttp.get<IRequest>("project");
    },
    {
      manual: true,
    }
  );

  async function init() {
    const res = await getGitlabProjectAll();
    setGitLabList(res);
    const { data } = await apiHttp.get<IRequest>("serve");
    setServeList(data);
  }

  const list = useMemo(() => {
    if (!isHasData(project)) return <NoData className="h-[400px] w-full" />;
    if (type === "card")
      return project.map((_, index) => {
        return (
          <Col span={8} key={index}>
            <CheckCard
              title={"" + _.name}
              description={`Last update ${formatTime(_.update)}`}
              value={index}
              style={{ width: "100%", height: 100, paddingBlock: 10 }}
            />
          </Col>
        );
      });
    return (
      <Table
        className="w-full"
        dataSource={
          project.map((_, index) => {
            return {
              name: _.name,
              update: `Last update ${formatTime(_.update)}`,
              key: index,
            };
          }) as any[]
        }
        columns={columns}
      />
    );
  }, [project, type]);

  function resetFormOfKey(
    target: RefObject<FormInstance<IFormBase>>,
    arr: [string, (res: any) => any, (res: any) => any][]
  ) {
    const names = arr.map(([name, fn, val]) => {
      isFunction(fn) && fn(val);
      return name;
    });
    target?.current?.resetFields(names);
  }

  function resetFormOfBase(
    arr: [string, (res: any) => any, (res: any) => any][]
  ) {
    resetFormOfKey(formRef, arr);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <PageContainer
      className="ant-page-project-container"
      fixedHeader
      header={{
        title: (
          <div className="flex items-center gap-[8px]">
            <Dropdown
              trigger={["click"]}
              menu={{
                items,
                onClick: changeListType,
                selectable: true,
                defaultSelectedKeys: ["card"],
              }}
              placement="bottomLeft"
              arrow
            >
              <Button type="primary" icon={<MoreOutlined />} />
            </Dropdown>

            <Button type="primary" onClick={() => setVisible(true)}>
              New project
            </Button>
            <StepsForm
              formRef={formRef}
              onFinish={async (values) => {
                setVisible(false);
              }}
              formProps={{
                validateMessages: {
                  required: "此项为必填项",
                },
              }}
              stepsFormRender={(dom, submitter) => {
                return (
                  <Modal
                    title="制品仓库"
                    width={800}
                    onCancel={() => setVisible(false)}
                    open={visible}
                    footer={submitter}
                    destroyOnClose
                  >
                    {dom}
                  </Modal>
                );
              }}
            >
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
                    const { data } = await apiHttp.get<IRequest>(
                      "project/branchs",
                      {
                        id: gitlabValue,
                      }
                    );

                    if (data) {
                      setBranchList(data);
                    }
                  }
                }}
              >
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
                          <span style={{ color: "red" }}>{item.label}</span> -{" "}
                          {item.url}
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
              </StepsForm.StepForm>
              <StepsForm.StepForm name="checkbox" title="设置流水线">
                <CodeMirror
                  value={code}
                  height="200px"
                  readOnly={false}
                  onChange={(value, viewUpdate) => {
                    console.log("value:", value);
                  }}
                />
              </StepsForm.StepForm>
              <StepsForm.StepForm name="time" title="发布实验">
                <ProFormCheckbox.Group
                  name="checkbox"
                  label="部署单元"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  options={["部署单元1", "部署单元2", "部署单元3"]}
                />
                <ProFormSelect
                  label="部署分组策略"
                  name="remark"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  width="md"
                  initialValue="1"
                  options={[
                    {
                      value: "1",
                      label: "策略一",
                    },
                    { value: "2", label: "策略二" },
                  ]}
                />
                <ProFormSelect
                  label="Pod 调度策略"
                  name="remark2"
                  width="md"
                  initialValue="2"
                  options={[
                    {
                      value: "1",
                      label: "策略一",
                    },
                    { value: "2", label: "策略二" },
                  ]}
                />
              </StepsForm.StepForm>
            </StepsForm>
          </div>
        ),
      }}
    >
      <CheckCard.Group
        onChange={(value) => {
          console.log("value", value);
        }}
      >
        <Row gutter={[20, 20]}>{list}</Row>
      </CheckCard.Group>
    </PageContainer>
  );
};

export default Project;
