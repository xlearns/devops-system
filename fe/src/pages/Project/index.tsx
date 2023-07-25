import NoData from "@/components/NoData";
import { formatTime } from "@/utils/format";
import { MoreOutlined } from "@ant-design/icons";
import {
  CheckCard,
  PageContainer,
  StepsForm,
} from "@ant-design/pro-components";
import { useModel, useRequest } from "@umijs/max";
import type { MenuProps } from "antd";
import { Button, Col, Dropdown, FormInstance, Modal, Row, Table } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { apiHttp } from "@/utils/http";
import type { IRequest } from "@/utils/http";
import type { IServeList } from "@/pages/interface";
import Pipeline from "./Pipeline";
import { resetFormOfKey } from "./utils";
import { IFormBase } from "./interface";
import Base from "./Base";

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

  useEffect(() => {
    init();
  }, []);

  function resetFormOfBase(
    arr: [string, (res: any) => any, (res: any) => any][]
  ) {
    resetFormOfKey(formRef, arr);
  }

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
                const data = await apiHttp.post<IRequest>("product/create", {
                  product: values,
                });
                console.log(data);
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
                <Base
                  serveList={serveList}
                  gitLabList={gitLabList}
                  branchList={branchList}
                />
              </StepsForm.StepForm>
              <StepsForm.StepForm name="checkbox" title="设置流水线">
                <Pipeline />
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
