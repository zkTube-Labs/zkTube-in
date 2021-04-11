const headerMenuConfig = [];

const asideMenuConfig = [
  {
    name: 'My Wallet(original)',
    path: '/dashboard/monitor',
    icon: 'chart-pie',
    // children: [
    //   {
    //     name: '分析页面',
    //     path: '/dashboard/analysis',
    //   },
    //   {
    //     name: '监控页面',
    //     path: '/dashboard/monitor',
    //   },
    //   {
    //     name: '工作台',
    //     path: '/dashboard/workplace',
    //   },
    // ],
  },
  // {
  //   name: '登录&注册',
  //   path: '/dashboard/workplace',
  //   icon: 'account',
  //   children: [
  //     {
  //       name: '登录',
  //       path: '/user/login',
  //     },
  //     {
  //       name: '注册',
  //       path: '/user/register',
  //     },
  //   ],
  // },
  {
    name: 'My Wallet',
    path: '/mywallet',
    icon: 'email',
  },
];

export { headerMenuConfig, asideMenuConfig };
