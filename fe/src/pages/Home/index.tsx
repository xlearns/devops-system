import { PageContainer } from "@ant-design/pro-components";
import { Alert, Card, Typography,Button } from "antd";
import type { ReactNode } from "react";
import styles from "./index.less";
import {useRequest } from '@umijs/max'
const CodePreview: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Test = ()=>{
  // const { data, error, loading } = useRequest(() => {
  //   return fetch('/api/rest-crud/gitlab').then(res => res.json())
  // });
  fetch('/api/rest-crud/gitlab').then(res => res.json())
}

const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <PageContainer>
        <Button onClick={Test}>test</Button>

      <Card>
        <Alert
          message="更快更强的重型组件，已经发布。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          高级表格{" "}
          <a
            href="https://protable.ant.design/"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          高级布局{" "}
          <a
            href="https://prolayout.ant.design/"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default HomePage;
