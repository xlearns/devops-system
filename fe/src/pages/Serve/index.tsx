import { RegIp, RegPort } from "@/utils/regular";
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import { EditableProTable, ProCard } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";

type DataSourceType = {
  id: React.Key;
  user?: string;
  password?: number;
  host?: string;
  port?: number;
};

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>();
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "主机地址",
      dataIndex: "host",
      valueType: "text",
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
          {
            pattern: RegIp,
            message: "请输入正确的IP地址",
          },
        ],
      },
    },
    {
      title: "端口号",
      dataIndex: "port",
      valueType: "text",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
          {
            pattern: RegPort,
            message: "请输入正确的端口",
          },
        ],
      },
    },
    {
      title: "用户",
      dataIndex: "user",
      valueType: "text",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "密码",
      dataIndex: "password",
      valueType: "password",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (_, row) => [
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(row.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{
          x: 960,
        }}
        controlled
        actionRef={actionRef}
        maxLength={5}
        columns={columns}
        request={async () => {
          return {
            data: [],
            total: 3,
            success: true,
          };
        }}
        recordCreatorProps={{
          record: (index) => {
            return { id: index + 1 };
          },
        }}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
            defaultDom.delete,
          ],
          onSave: async (alias, row) => {
            await waitTime(20);
            console.log(row);
          },
          onDelete: async (alias, row) => {
            await waitTime(20);
            console.log(row);
          },
        }}
      />
    </ProCard>
  );
};
