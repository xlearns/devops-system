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
        name: '概要',
        path: '/home',
        icon: 'HomeOutlined',
        component: './Home',
      },
      {
        name: 'CICD',
        path: '/cicd',
        icon: 'CodeOutlined',
        component: './Access',
      },
      {
        name: '项目管理',
        path: '/project',
        icon: 'TableOutlined',
        component: './Project',
      },
      {
        path: '*', // 通配符路径，匹配所有未定义的路径
        element: '404', 
      },
    ],
  },
];
