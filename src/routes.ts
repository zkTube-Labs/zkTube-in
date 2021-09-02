import MyWallet from '@/pages/MyWallet';
import ComingSoon from '@/pages/ComingSoon';
import WhitePaper from '@/pages/WhitePaper';
import Home from '@/pages/Home';

const routerConfig = [
  {
    path: '/termsofuseandprivacy',
    component: WhitePaper,
  },
  {
    path: '/',
    component: Home,
  },
  // {
  //   path: '/',
  //   component: MyWallet,
  //   children: [
  //     {
  //       path: '/coming-soon',
  //       component: ComingSoon,
  //     },
  //   ],
  // },
];

export default routerConfig;
