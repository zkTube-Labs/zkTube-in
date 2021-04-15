import { createStore } from 'ice';
import wallet from '@/models/wallet';

const store = createStore({ wallet });

export default store;
