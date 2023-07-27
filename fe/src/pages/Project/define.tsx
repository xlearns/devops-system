import CodeMirror from "@uiw/react-codemirror";
import { IProject } from "@/models/global";
import { Button, Card, Descriptions, Drawer } from "antd";
import { IRequest, apiHttp } from "@/utils/http";
import { useEffect, useState } from "react";
import { useUpdateProduct } from "./updateProduct";
import JennkisTerminal from "./terminal";

const Define: React.FC<{
  content: IProject;
  setOpen: (args: boolean) => void;
}> = ({ content, setOpen }) => {
  const { getProduct } = useUpdateProduct();
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const { pipeline, gitlab, branch, host, cicd, env, name } = content;
  const [code, setCode] = useState<string>();

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onDelete = async () => {
    const { id } = content;
    await apiHttp.delete(`product/delete/${id}`);
    getProduct();
    setOpen(false);
  };
  const onSave = async () => {
    const { id, ...rest } = content;
    const data = { ...rest, pipeline: code };
    await apiHttp.put<IRequest>(`product/update/${id}`, {
      data,
    });
    getProduct();
  };

  async function cicdBuild() {
    if (cicd != "jenkins") return;
    const data = await apiHttp.post("cicd", {
      data: {
        code: code,
        name,
      },
    });
    console.log(data);
  }
  // Polling Console Output
  useEffect(() => {
    setCode(pipeline);
  }, [pipeline]);

  return (
    <>
      <Card bordered={false}>
        {gitlab && (
          <Descriptions title="gitlab信息" bordered>
            <Descriptions.Item label="label">{gitlab.label}</Descriptions.Item>
            <Descriptions.Item label="id">{gitlab.key}</Descriptions.Item>
            <Descriptions.Item label="branch">{branch}</Descriptions.Item>
            <Descriptions.Item label="url" span={3}>
              {gitlab.url}
            </Descriptions.Item>
          </Descriptions>
        )}

        <Descriptions title="服务器信息" bordered>
          <Descriptions.Item label="host" span={3}>
            {host}
          </Descriptions.Item>
          <Descriptions.Item label="cicd" span={3}>
            {cicd}
          </Descriptions.Item>
          <Descriptions.Item label="build env" span={3}>
            {env}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <div className="mt-[20px]"></div>
      <Card title="流水线" bordered={false}>
        <CodeMirror
          className="flex-1"
          value={pipeline}
          width="100%"
          height="600px"
          readOnly={false}
          onChange={(value) => {
            setCode(value);
          }}
        />
      </Card>
      <div className="mt-[20px]"></div>
      <div className="flex flex-col gap-[20px]">
        <div>
          <Button onClick={showChildrenDrawer}>查看构建结果</Button>
        </div>
        <Button className="w-full" onClick={cicdBuild}>
          构建
        </Button>
        <Button className="w-full" type="primary" onClick={onSave}>
          保 存
        </Button>
        <Button className="w-full" type="primary" danger onClick={onDelete}>
          删 除
        </Button>
      </div>
      <Drawer
        title="构建结果"
        width={500}
        closable={false}
        onClose={onChildrenDrawerClose}
        open={childrenDrawer}
      >
        <div className="overflow-hidden">
          <JennkisTerminal />
        </div>
      </Drawer>
    </>
  );
};

export default Define;
