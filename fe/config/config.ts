import { defineConfig } from '@umijs/max';
import alias from './alias';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  devtool: 'source-map',
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  alias,
  tailwindcss: {},
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  routes,
  npmClient: 'pnpm',
});
