import CodeMirror from "@uiw/react-codemirror";
import { IProject } from "@/models/global";
import { Button, Card, Descriptions } from "antd";
import { apiHttp } from "@/utils/http";

const Define: React.FC<{ content: IProject }> = ({ content }) => {
  const { pipeline, gitlab, branch, host, cicd, env, name } = content;

  async function cicdBuild() {
    if (cicd != "jenkins") return;
    const data = await apiHttp.post("cicd", {
      data: {
        code: pipeline,
        name,
      },
    });
    console.log(data);
  }
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
          onChange={() => {}}
        />
      </Card>
      <div className="mt-[20px]"></div>
      <div className="flex flex-col gap-[20px]">
        <Button className="w-full">查看构建结果</Button>
        <Button className="w-full" onClick={cicdBuild}>
          构建
        </Button>
        <Button className="w-full" type="primary">
          保 存
        </Button>
        <Button className="w-full" type="primary" danger>
          删 除
        </Button>
      </div>
    </>
  );
};

export default Define;
