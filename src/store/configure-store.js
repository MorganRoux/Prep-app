import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import equipmentsReducer from '../reducers/equipment';
import filtersReducer from '../reducers/filters';
import stocklistReducer from '../reducers/stocklist';
import userReducer from '../reducers/user';
import projectsReducer from '../reducers/projects';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {

    const store = createStore(
        combineReducers({
            equipments: equipmentsReducer,
            filters: filtersReducer,
            stocklist: stocklistReducer,
            user: userReducer,
            projects: projectsReducer
        }), composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

export default configureStore