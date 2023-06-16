// 运行时配置
import defaultSettings from '@config/defaultSettings';
import { history } from '@umijs/max';
import { parse } from 'qs';
import { useEffect } from 'react';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  const { search } = history.location;
  const { code } = parse(search && search.slice(1));

  useEffect(() => {
    if (code) {
      sessionStorage.setItem('@gitlab-token', code as string);
    } else {
      const token = sessionStorage.getItem('@gitlab-token');
      if (!token) {
        history.push('/login');
      }
    }
  }, []);

  return {
    locale: false,
    ...defaultSettings,
  };
};
