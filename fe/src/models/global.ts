// 全局共享数据示例
import { DEFAULT_NAME, Project_Info } from '@/constants';
import { useState } from 'react';

type TNString = string | number;

export interface IProject {
  id?: TNString;
  name?: Extract<TNString, string>;
  description?: Extract<TNString, string>;
  url?: Extract<TNString, string>;
  update?: Extract<TNString, string>;
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
