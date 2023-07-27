import { Button } from "antd";
import CodeMirror from "@uiw/react-codemirror";
import { isFunction } from "@/utils/judgment";
import { useEffect, useState } from "react";
import { PipelineTemplates } from "./content";

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
  function update(str: string, num: number) {
    if (!updateTemplate) return;
    if (!isFunction(updateTemplate)) return;
    setActive(num);
    updateTemplate(str);
  }

  return (
    <>
      {PipelineTemplates(defaultCode).map(({ name, template }, index) => {
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
          onChange={(value) => {
            setCode(value);
          }}
        />
      </div>
    </div>
  );
};

export default Pipeline;
