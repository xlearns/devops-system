import { PlusOutlined } from "@ant-design/icons";
import { DrawerForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form } from "antd";
import CodeMirror from "@uiw/react-codemirror";

const defaultCode = `pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
  }
  `;

const ComModal: React.FC<unknown> = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="新建流水线"
      form={form}
      trigger={
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {}}
          type="primary"
        >
          新建
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="md"
          label="名称"
          placeholder="请输入名称"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText
          width="md"
          name="type"
          label="类别"
          placeholder="请输入类别"
        />
      </ProForm.Group>
      <CodeMirror
        className="flex-1"
        value={defaultCode}
        width="100%"
        height="600px"
        readOnly={false}
        onChange={() => {}}
      />

      {/* <ProFormTextArea
        name="text"
        label="流水线内容"
        placeholder="请输入内容"
        fieldProps={{
          rows: 24,
          allowClear: true,
        }}
        rules={[
          {
            required: true,
          },
        ]}
      /> */}
    </DrawerForm>
  );
};

export default ComModal;
