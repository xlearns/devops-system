export default [
  { path: '/login', component: './Login', layout: false },
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    flatMenu: true,
    routes: [
      {
        path: '/',
        redirect: '/serve',
      },
      {
        name: '服务器管理',
        path: '/serve',
        icon: 'HomeOutlined',
        component: './Serve',
      },
      {
        name: '流水线管理',
        path: '/pipeline',
        icon: 'TableOutlined',
        component: './Pipeline',
      },
      {
        name: '项目管理',
        path: '/project',
        icon: 'CodeOutlined',
        component: './Project',
      },
      // {
      //   name: '日志管理',
      //   path: '/project',
      //   icon: 'CodeOutlined',
      //   component: './Project',
      // },
      // {
      //   name: '系统监控',
      //   path: '/project',
      //   icon: 'CodeOutlined',
      //   component: './Project',
      // },
      // {
      //   name: '容器管理',
      //   path: '/project',
      //   icon: 'CodeOutlined',
      //   component: './Project',
      // },
      {
        path: '*', // 通配符路径，匹配所有未定义的路径
        element: '404',
      },
    ],
  },
];
