import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import AppRouter, { history } from './router/AppRouter';
import configureStore from './store/configure-store';
import { SnackbarProvider } from 'notistack';

import './firebase/firebase';
import { startFetchEquipmentList } from './actions/equipment';
import { firebase } from './firebase/firebase';

import { login, logout } from './actions/user';

const store = configureStore();

const jsx = (
    <Provider store={store}>
    <SnackbarProvider 
        maxSnack={3}
        transitionDuration={{ exit: 380, enter: 400 }}
        autoHideDuration= {2500}>
        <AppRouter />
    </SnackbarProvider>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    //if authenticated 
    if(user) {
        // update login to the reducer
        store.dispatch(login(user.uid));
        // fetch data and render if necessary
        store.dispatch(startFetchEquipmentList()).then(() => {
            renderApp();
        });

        // if in the loginpage : route to the dashboard
        if(history.location.pathname ==='/') {
            history.push('/dashboard');
        }
    }
    else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }

});