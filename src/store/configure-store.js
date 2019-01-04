import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import equipmentsReducer from '../reducers/equipments';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTESION_COMPOSE__ || compose;

const configureStore = () => {

    const store = createStore(
        combineReducers({
            equipments: equipmentsReducer,
            filters: filtersReducer
        }), composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

export default configureStore