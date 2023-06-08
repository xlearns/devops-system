export default [
  { path: '/login', component: './Login', layout: false },
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    flatMenu: true,
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        icon: 'HomeOutlined',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        icon: 'CodeOutlined',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        icon: 'TableOutlined',
        component: './Table',
      },
    ],
  },
];
