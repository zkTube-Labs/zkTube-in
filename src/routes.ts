import BasicLayout from '@/layouts/BasicLayout';
import MyWallet from '@/pages/MyWallet';
import WalletDetail from '@/pages/WalletDetail';
import WalletDeposit from '@/pages/WalletDeposit';
import DepositSuccess from '@/pages/DepositSuccess';
import Transfer from '@/pages/Transfer';
import TransferSuccess from '@/pages/TransferSuccess';
import Withdraw from '@/pages/Withdraw';
import WithdrawSuccess from '@/pages/WithdrawSuccess';
import ComingSoon from '@/pages/ComingSoon';


const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/wallet/detail',
        component: WalletDetail,
      },
      {
        path: '/wallet/deposit/success',
        component: DepositSuccess,
      },
      {
        path: '/wallet/deposit/fail',
        component: DepositSuccess,
      },
      {
        path: '/wallet/deposit',
        component: WalletDeposit,
      },
      {
        path: '/wallet/transfer',
        component: Transfer,
        exact: true,
      },
      {
        path: '/wallet/transfer/success',
        component: TransferSuccess,
      },
      {
        path: '/wallet/withdraw',
        component: Withdraw,
        exact: true,
      },
      {
        path: '/wallet/withdraw/success',
        component: WithdrawSuccess,
      },
      {
        path: '/wallet',
        component: MyWallet,
      },
      {
        path: '/coming-soon',
        component: ComingSoon,
      },
      {
        path: '/',
        redirect: '/wallet',
      },
    ],
  },
];

export default routerConfig;
