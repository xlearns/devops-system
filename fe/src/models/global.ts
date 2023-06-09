// 全局共享数据示例
import { DEFAULT_NAME, Project_Info } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [project, setProject] = useState<unknown[]>(Project_Info);
  return {
    name,
    setName,
    project,
    setProject,
  };
};

export default useUser;
