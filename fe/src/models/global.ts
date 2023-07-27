// 全局共享数据示例
import { DEFAULT_NAME, Project_Info } from '@/constants';
import { useState } from 'react';

type TNString = string | number;

export interface IProject {
  id?: TNString;
  name?: Extract<TNString, string>;
  description?: Extract<TNString, string>;
  host?: Extract<TNString, string>;
  branch?: Extract<TNString, string>;
  cicd?: Extract<TNString, string>;
  env?: Extract<TNString, string>;
  gitlab?: {
    label: Extract<TNString, string>;
    key: Extract<TNString, string>;
    url: Extract<TNString, string>;
  };
  pipeline?: Extract<TNString, string>;
}

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [project, setProject] = useState<IProject[]>(Project_Info);
  return {
    name,
    setName,
    project,
    setProject,
  };
};

export default useUser;
