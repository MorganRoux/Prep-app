import kits from '../tests/fixtures/kits';
const kitsReducerDefaultState = kits;

const kitsReducer = (state = kitsReducerDefaultState, action) => {
    switch(action.type){

    default:
        return state;
    }
}

export default kitsReducer