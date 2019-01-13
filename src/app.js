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
import { startFetchProjectData } from './actions/projects';
import { login, logout, setUserData, startFetchUserData, createProfile } from './actions/user';

import { firebase, handleAuthChange } from './firebase/firebase';
import {setupFirebase} from './tests/fixtures/firebase';
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
        // store.dispatch(login(user.uid));

        // fetch data 
        store.dispatch(startFetchUserData(user.uid))
        .then( () => {
                const projectId = store.getState().user.currentProject;
                return store.dispatch(startFetchProjectData(projectId));
        }).then( () => store.dispatch(startFetchEquipmentList())
        //and render if necessary
        ).then(() => renderApp()

        //catch the errors
        ).catch((e) => {
            switch (e.message.toLowerCase()) {
                case 'user not found' :
                store.dispatch(createProfile(user.uid))
                .then( () => renderApp());
            };
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