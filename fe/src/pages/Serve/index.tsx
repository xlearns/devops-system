import { RegIp, RegPort } from "@/utils/regular";
import type {
  ActionType,
  ProColumns,
  ProFormInstance,
} from "@ant-design/pro-components";
import { EditableProTable, ProCard } from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import { apiHttp } from "@/utils/http";
import type { IRequest } from "@/utils/http";
import { IServeList } from "@/pages/interface";
import { useDataSource } from "./hook";
import { omit } from "@/utils/format";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const actionRef = useRef<ActionType>();
  const { changeEditState, dataSource, setDataSource } = useDataSource();

  const columns: ProColumns<IServeList>[] = [
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
            const { id } = row;
            if (!id) return;
            changeEditState(true, id);
            actionRef.current?.startEditable(id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  async function getTable() {
    const { data } = await apiHttp.get<IRequest>("serve");
    setDataSource(data);
  }

  useEffect(() => {
    getTable();
  }, []);
  return (
    <ProCard>
      <EditableProTable<IServeList>
        rowKey="id"
        scroll={{
          x: 960,
        }}
        controlled
        actionRef={actionRef}
        maxLength={5}
        columns={columns}
        recordCreatorProps={{
          record: () => {
            return { id: new Date().getTime() };
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
            const { id, isEdit } = row;
            const data = omit(row, ["id", "isEdit", "index"]);
            if (isEdit && id) {
              await apiHttp.put<IRequest>(`serve/${id}`, {
                data,
              });
              changeEditState(false, id);
            } else {
              await apiHttp.post<IRequest>("serve", {
                data,
              });
            }
            getTable();
          },
          onDelete: async (alias, row) => {
            const { id } = row;
            await apiHttp.delete(`serve/${id}`);
            getTable();
          },
        }}
      />
    </ProCard>
  );
};
