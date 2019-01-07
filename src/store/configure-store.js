import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import equipmentsReducer from '../reducers/equipment';
import filtersReducer from '../reducers/filter';
import stocklistReducer from '../reducers/stocklist';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTESION_COMPOSE__ || compose;

const configureStore = () => {

    const store = createStore(
        combineReducers({
            equipments: equipmentsReducer,
            filters: filtersReducer,
            stocklist: stocklistReducer
        }), composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

export default configureStore