import UserLayout from '@/layouts/UserLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import BasicLayout from '@/layouts/BasicLayout';
import Solution from '@/pages/Solution';
import Analysis from '@/pages/Analysis';
import Monitor from '@/pages/Monitor';
import Workplace from '@/pages/Workplace';
import MyWallet from '@/pages/MyWallet';
import WalletDetail from '@/pages/WalletDetail';
import Transfer from '@/pages/Transfer';
import TransferSuccess from '@/pages/TransferSuccess';
import Withdraw from '@/pages/Withdraw';
import WithdrawSuccess from '@/pages/WithdrawSuccess';
import WithdrawFail from '@/pages/WithdrawFail';




const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/solution',
        component: Solution,
      },
      {
        path: '/dashboard/analysis',
        component: Analysis,
      },
      {
        path: '/dashboard/monitor',
        component: Monitor,
      },
      {
        path: '/dashboard/workplace',
        component: Workplace,
      },
      {
        path: '/wallet/detail',
        component: WalletDetail,
      },
      {
        path: '/wallet/transfer',
        component: Transfer,
        exact: true
      },
      {
        path: '/wallet/transfer/success',
        component: TransferSuccess,
      },
     
      {
        path: '/wallet/withdraw',
        component: Withdraw,
        exact: true
      },
      {
        path: '/wallet/withdraw/success',
        component: WithdrawSuccess,
      },
      {
        path: '/wallet/withdraw/fail',
        component: WithdrawFail,
      },
      {
        path: '/wallet',
        component: MyWallet,
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
    ],
  },
];
export default routerConfig;