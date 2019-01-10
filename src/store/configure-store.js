import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import equipmentsReducer from '../reducers/equipment';
import filtersReducer from '../reducers/filters';
import stocklistReducer from '../reducers/stocklist';
import authReducer from '../reducers/auth';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {

    const store = createStore(
        combineReducers({
            equipments: equipmentsReducer,
            filters: filtersReducer,
            stocklist: stocklistReducer,
            auth: authReducer
        }), composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

export default configureStore