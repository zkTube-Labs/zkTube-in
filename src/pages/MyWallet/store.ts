import { createStore } from 'ice';
import swdialog from './models/swdialog';
import mtdialog from './models/mtdialog';
import unmdialog from './models/unmdialog';

const store = createStore({ 
    swdialog,
    mtdialog,
    unmdialog
});

export default store;