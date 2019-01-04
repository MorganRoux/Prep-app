import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import DashboardPage from './components/DashboardPage';
import configureStore from './store/configure-store';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <DashboardPage />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('app'));
