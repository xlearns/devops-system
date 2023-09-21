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
        name: '仪表盘',
        path: '/serve',
        icon: 'HomeOutlined',
        component: './Serve',
      },

      {
        name: '主机管理',
        path: '/host',
        icon: 'HomeOutlined',
        // component: './Serve',
        routes: [
          {
            name: '机房管理',
            path: '',
          },
          {
            name: '主机分组',
            path: '',
          },
          {
            name: '主机管理',
            path: '',
          },
        ],
      },

      {
        name: '应用发布',
        path: '/release',
        icon: 'HomeOutlined',
        routes: [
          {
            name: '环境管理',
            path: '',
          },
          {
            name: '项目管理',
            path: '',
          },
          {
            name: '应用管理',
            path: '',
          },
          {
            name: '发布申请',
            path: '',
          },
        ],
      },

      {
        name: '系统配置',
        path: '/serve',
        icon: 'HomeOutlined',
        // component: './Serve',
        routes: [
          {
            name: '用户管理',
            path: '',
          },
          {
            name: '权限管理',
            path: '',
          },
          {
            name: '部门管理',
            path: '',
          },
          {
            name: '角色管理',
            path: '',
          },
        ],
      },
      // {
      //   name: '服务器管理',
      //   path: '/serve',
      //   icon: 'HomeOutlined',
      //   component: './Serve',
      // },
      // {
      //   name: '流水线管理',
      //   path: '/pipeline',
      //   icon: 'TableOutlined',
      //   component: './Pipeline',
      // },
      // {
      //   name: '项目管理',
      //   path: '/project',
      //   icon: 'CodeOutlined',
      //   component: './Project',
      // },
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
