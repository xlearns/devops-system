import { Button } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { StepsForm } from "@ant-design/pro-components";

const code = `pipeline {
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

const Pipeline: React.FC<unknown> = () => {
  return (
    <StepsForm.StepForm name="checkbox" title="设置流水线">
      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-[5px]">
          <h4 className="pl-[10px]">常用模板</h4>
          <div className="h-[106px] flex overflow-y-auto flex-col gap-[5px]">
            <Button>自动部署</Button>
          </div>
        </div>
        <CodeMirror
          className="flex-1"
          value={code}
          height="200px"
          readOnly={false}
          onChange={(value, viewUpdate) => {
            console.log("value:", value);
          }}
        />
      </div>
    </StepsForm.StepForm>
  );
};

export default Pipeline;
