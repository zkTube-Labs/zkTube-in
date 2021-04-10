import { createStore } from 'ice';
import user from './models/user';
import account from './models/account';

const store = createStore({ user, account });

export default store;
