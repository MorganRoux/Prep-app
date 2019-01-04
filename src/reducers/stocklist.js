import stocklist from '../tests/fixtures/stocklist';
const stocklistReducerDefaultState = stocklist;

const stocklistReducer = (state = stocklistReducerDefaultState, action) => {
    switch(action.type){

    default:
        return state;
    }
}

export default stocklistReducer