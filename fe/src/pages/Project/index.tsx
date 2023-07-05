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
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { useModel, useRequest } from "@umijs/max";
import type { MenuProps } from "antd";
import { Button, Col, Dropdown, Modal, Row, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";

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
  const [visible, setVisible] = useState(false);
  const { type, changeListType } = useListType();

  const { run: getGitlabProjectAll } = useRequest(
    () => {
      return fetch("/api/project", {
        headers: {
          token: "" + sessionStorage.getItem("@gitlab-token"),
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    {
      manual: true,
    }
  );

  function createProject() {
    // setProject((attr) => {
    //   return [...attr, {}];
    // });
  }

  async function init() {
    const res = await getGitlabProjectAll();
    setGitLabList(res);
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
                name="base"
                title="制品仓库"
                onFinish={async () => {
                  return true;
                }}
              >
                <ProFormText
                  name="host"
                  width="md"
                  label="主机"
                  placeholder="[用户@]主机地址"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="port"
                  width="md"
                  label="端口"
                  rules={[{ required: true }]}
                />
                <ProFormSelect
                  name="select"
                  label="选择gitlab仓库"
                  options={gitLabList.map(({ name, url }, index) => {
                    return {
                      label: name,
                      value: url,
                    };
                  })}
                  fieldProps={{
                    optionItemRender(item: { label: string; value: string }) {
                      return (
                        <div title={item.value}>
                          <span style={{ color: "red" }}>{item.label}</span> -{" "}
                          {item.value}
                        </div>
                      );
                    },
                  }}
                  placeholder="Please select"
                  rules={[{ required: true }]}
                />
                <ProFormDatePicker name="date" label="日期" />
                <ProForm.Group title="时间选择">
                  <ProFormDateTimePicker name="dateTime" label="开始时间" />
                  <ProFormDatePicker name="date" label="结束时间" />
                </ProForm.Group>
                <ProFormTextArea
                  name="remark"
                  label="备注"
                  width="lg"
                  placeholder="请输入备注"
                />
              </StepsForm.StepForm>
              <StepsForm.StepForm name="checkbox" title="设置参数">
                <ProFormCheckbox.Group
                  name="checkbox"
                  label="迁移类型"
                  width="lg"
                  options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
                />
                <ProForm.Group>
                  <ProFormText
                    width="md"
                    name="dbname"
                    label="业务 DB 用户名"
                  />
                  <ProFormDatePicker
                    name="datetime"
                    label="记录保存时间"
                    width="sm"
                  />
                  <ProFormCheckbox.Group
                    name="checkbox"
                    label="迁移类型"
                    options={["完整 LOB", "不同步 LOB", "受限制 LOB"]}
                  />
                </ProForm.Group>
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
