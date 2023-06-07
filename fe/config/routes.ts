export default [
  { path: '/login', component: './Login', layout: false },
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      },
    ],
  },
];
