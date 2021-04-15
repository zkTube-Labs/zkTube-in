import BasicLayout from '@/layouts/BasicLayout';
import MyWallet from '@/pages/MyWallet';
import WalletDetail from '@/pages/WalletDetail';
import WalletDeposit from '@/pages/WalletDeposit';
import Transfer from '@/pages/Transfer';
import TransferSuccess from '@/pages/TransferSuccess';
import Withdraw from '@/pages/Withdraw';
import WithdrawSuccess from '@/pages/WithdrawSuccess';
import WithdrawFail from '@/pages/WithdrawFail';

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
        path: '/wallet/withdraw/fail',
        component: WithdrawFail,
      },
      {
        path: '/wallet',
        component: MyWallet,
      },
      {
        path: '/',
        redirect: '/wallet',
      },
    ],
  },
];

export default routerConfig;
