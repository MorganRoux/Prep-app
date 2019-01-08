import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import equipments from './tests/fixtures/equipment';
import DashboardPage from './components/DashboardPage';
import configureStore from './store/configure-store';
import { SnackbarProvider } from 'notistack';

import database from './firebase/firebase'
import { startFetchEquipmentList } from './actions/equipment';

//Setting a database
const setDatabase = () => {
    database.ref().set({});
    
    equipments.forEach( ({category, quantity, parentId, parentName, stockName}) => {
        database.ref('equipments').push({
            category,
            quantity,
            stockName,
            parentId,
            parentName
        }).then(() => {
            console.log('data saved');
        }).catch((e) => {
            console.log('error : ', e);
        })
    });
}

const store = configureStore();

const jsx = (
    <Provider store={store}>
    <SnackbarProvider 
        maxSnack={3}
        transitionDuration={{ exit: 380, enter: 400 }}
        autoHideDuration= {2500}>
        <DashboardPage />
    </SnackbarProvider>
    </Provider>
);

//setDatabase();

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startFetchEquipmentList()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});




