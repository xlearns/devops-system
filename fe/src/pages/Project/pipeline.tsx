import { Button } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { isFunction } from "@/utils/judgment";
import { useEffect, useState } from "react";

export interface IPipeline {
  code: string;
  setCode: (args: any) => any;
}

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

const ComTemplate: React.FC<{ updateTemplate?: (args: any) => any }> = ({
  updateTemplate,
}) => {
  const [active, setActive] = useState(0);
  const templates = [
    {
      name: "默认",
      template: defaultCode,
    },
    {
      name: "CICD部署",
      template: `pipeline {
          agent any
          stages {
              stage('Build') {
                  steps {
                  sh 'mvn clean package'
                  }
              }
              stage('Deploy') {
                  steps {
                    sh 'docker build -t your_image_name .'
                    sh 'docker push your_image_name'
                    sh 'ssh user@your_server "docker pull your_image_name && docker run -d --name your_container_name -p 8080:8080 your_image_name"'
                  }
              }
          }
      }
        `,
    },
  ];

  function update(str: string, num: number) {
    if (!updateTemplate) return;
    if (!isFunction(updateTemplate)) return;
    setActive(num);
    updateTemplate(str);
  }

  return (
    <>
      {templates.map(({ name, template }, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              update(template, index);
            }}
            type="primary"
            ghost
            disabled={index == active ? true : false}
          >
            {name}
          </Button>
        );
      })}
    </>
  );
};

const Pipeline: React.FC<IPipeline> = ({ code, setCode }) => {
  function updateTemplate(temp: string) {
    temp && setCode(temp);
  }

  useEffect(() => {
    updateTemplate(defaultCode);
  }, []);

  return (
    <div className="flex items-center gap-[30px]">
      <div className="flex flex-col gap-[5px]">
        <h4 className="pl-[10px]">常用模板: </h4>
        <div className="h-[106px] flex overflow-y-auto flex-col gap-[5px]">
          <ComTemplate updateTemplate={updateTemplate} />
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <CodeMirror
          className="flex-1"
          value={code}
          width="600px"
          height="200px"
          readOnly={false}
          onChange={(value, viewUpdate) => {
            setCode(value);
          }}
        />
      </div>
    </div>
  );
};

export default Pipeline;
