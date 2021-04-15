import { IStoreDispatch } from 'ice';

interface IState {
  metaDialogVisible: boolean;
  selectWalletDialogVisible: boolean;
  unMetaDialogVisible: boolean;
}

export default {
  state: {
    metaDialogVisible: false,
    selectWalletDialogVisible: false,
    unMetaDialogVisible: false,
  },
  effects: ({ user }: IStoreDispatch) => ({
    async setState(state: IState, payload: any) {
      user.udpate(state, payload);
    },
  }),
  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
