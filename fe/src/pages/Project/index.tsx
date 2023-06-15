import NoData from "@/components/NoData";
import { MoreOutlined } from "@ant-design/icons";
import { CheckCard, PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import type { MenuProps } from "antd";
import { Button, Col, Dropdown, Row, Table } from "antd";
import React, { useMemo, useState } from "react";

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
  if (!Array.isArray(data)) return 
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
  const { type, changeListType } = useListType();

  const list = useMemo(() => {
    if (!isHasData(project)) return <NoData className="h-[400px] w-full" />;
    if (type === "card")
      return project.map((_, index) => {
        return (
          <Col span={8} key={index}>
            <CheckCard
              title="项目名称"
              description={`Last update ${index} minutes ago`}
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
              name: index,
              update: `Last update ${index} minutes ago`,
              key: index,
            };
          }) as any[]
        }
        columns={columns}
      />
    );
  }, [project, type]);

  function createProject() {
    setProject((attr) => {
      return [...attr, {}];
    });
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
            <Button type="primary" onClick={createProject}>
              New project
            </Button>
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
