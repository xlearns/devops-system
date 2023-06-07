import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  devtool: 'source-map',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
    locale: false,
    siderWidth: 200,
  },
  // alias: {
  //   '@': '/src',
  // },
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  routes,
  npmClient: 'pnpm',
});
