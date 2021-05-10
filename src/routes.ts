import MyWallet from '@/pages/MyWallet';
import ComingSoon from '@/pages/ComingSoon';


const routerConfig = [
  {
    path: '/',
    component: MyWallet,
    children: [
      {
        path: '/coming-soon',
        component: ComingSoon,
      },
    ],
  },
];

export default routerConfig;
