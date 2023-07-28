import NoData from "@/components/NoData";
import {
  CheckCard,
  PageContainer,
  StepsForm,
} from "@ant-design/pro-components";
import { useModel, useRequest } from "@umijs/max";
import { Button, Col, FormInstance, Modal, Table, Tooltip } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { apiHttp } from "@/utils/http";
import type { IRequest } from "@/utils/http";
import type { IServeList } from "@/pages/interface";
import Pipeline from "./pipeline";
import { resetFormOfKey } from "./utils";
import { IFormBase, IGitlabRepo } from "./interface";
import Base from "./base";
import Mode, { useListType } from "./mode";
import PCard from "./pcard";
import { columns } from "./content";
import { useUpdateProduct } from "./updateProduct";

function isHasData(data: unknown[]) {
  if (!Array.isArray(data)) return;
  return data.length > 0 ? true : false;
}

const Project: React.FC<unknown> = () => {
  const { project } = useModel("global");
  const [code, setCode] = useState("");
  const { type, changeListType } = useListType();
  const [gitLabList, setGitLabList] = useState<IGitlabRepo[]>([]);
  const [serveList, setServeList] = useState<IServeList[]>([]);
  const [branchList, setBranchList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { getProduct } = useUpdateProduct();
  const dom = useRef(null);

  const formRef = useRef<FormInstance<IFormBase>>(null);

  const { run: getGitlabProjectAll } = useRequest(
    () => {
      return apiHttp.get<IRequest>("project");
    },
    {
      manual: true,
    }
  );

  async function getGitlab() {
    const res = await getGitlabProjectAll();
    setGitLabList(res);
  }

  async function getServe() {
    const { data } = await apiHttp.get<IRequest>("serve");
    setServeList(data);
  }

  function init() {
    getGitlab();
    getServe();
    getProduct();
  }

  const list = useMemo(() => {
    if (!isHasData(project)) return <NoData className="h-[400px] w-full" />;
    if (type === "card")
      return project.map((_, index) => {
        return (
          <Col span={8} key={index}>
            <CheckCard
              title={<div className="font-bold ">{"" + _.name}</div>}
              description={
                <Tooltip placement="top" title={_.description} open={false}>
                  <div className="text-[#999] truncate" ref={dom}>
                    {_.description}
                  </div>
                </Tooltip>
              }
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
              update: _.description,
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
            <Mode changeListType={changeListType} />
            <Button type="primary" onClick={() => setVisible(true)}>
              New project
            </Button>
            <StepsForm
              formRef={formRef}
              onFinish={async (values) => {
                await apiHttp.post<IRequest>(
                  "product/create",
                  {
                    data: {
                      product: {
                        ...values,
                        pipeline: code,
                      },
                    },
                  },
                  {
                    beforeRequestCallback: (config: Record<string, string>) => {
                      config["timeout"] = "100000";
                      return config;
                    },
                  }
                );
                getProduct();
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
                <Pipeline code={code} setCode={setCode} />
              </StepsForm.StepForm>
            </StepsForm>
          </div>
        ),
      }}
    >
      <PCard list={list} />
    </PageContainer>
  );
};

export default Project;
