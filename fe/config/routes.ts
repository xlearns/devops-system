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
        name: 'dashboard',
        path: '/home',
        icon: 'HomeOutlined',
        component: './Home',
      },
      {
        name: 'CICD',
        path: '/access',
        icon: 'CodeOutlined',
        component: './Access',
      },
      {
        name: '项目管理',
        path: '/table',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '系统管理',
        path: '/table',
        icon: 'TableOutlined',
        component: './Table',
      },
    ],
  },
];
