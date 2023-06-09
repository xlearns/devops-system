import NoData from '@/components/NoData';
import { MoreOutlined } from '@ant-design/icons';
import { CheckCard, PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Col, Dropdown, Row } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: 'View',
    children: [
      {
        key: '1-1',
        label: 'Cards',
      },
      {
        key: '1-2',
        label: 'Table',
      },
    ],
  },
];

function isHasData(data: unknown[]) {
  if (!Array.isArray(data)) return;
  return data.length > 0 ? true : false;
}

const Project: React.FC<unknown> = () => {
  const { project, setProject } = useModel('global');

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
              trigger={['click']}
              menu={{ items }}
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
          console.log('value', value);
        }}
      >
        <Row gutter={[20, 20]}>
          {isHasData(project) ? (
            project.map((_, index) => {
              return (
                <Col span={8}>
                  <CheckCard
                    title="项目名称"
                    description={`Last update ${index} minutes ago`}
                    value={index}
                    style={{ width: '100%', height: 100, paddingBlock: 10 }}
                  />
                </Col>
              );
            })
          ) : (
            <NoData className="h-[400px] w-full" />
          )}
        </Row>
      </CheckCard.Group>
    </PageContainer>
  );
};

export default Project;
