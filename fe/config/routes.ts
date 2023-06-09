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
        name: '任务',
        path: '/task',
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
        name: '定时任务',
        icon: 'CodeOutlined',
        path: 'timing',
        routes: [
          {
            name: '定时列表',
            path: 'list',
            component: './Table',
          },
          {
            name: '任务日志',
            path: 'log',
            component: './Table',
          },
        ],
      },
      {
        name: '消息管理',
        path: '/new',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '集成',
        path: '/ci',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '部署',
        path: '/cd',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '测试',
        path: '/test',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '监控报警',
        path: '/monitor',
        icon: 'TableOutlined',
        component: './Table',
      },
      {
        name: '系统管理',
        path: '/system',
        icon: 'TableOutlined',
        routes: [
          {
            name: '系统配置',
            path: 'config',
            component: './Table',
          },
          {
            name: '系统日志',
            path: 'log',
            component: './Table',
          },
        ],
      },
    ],
  },
];
