import filtersReducer from '../../reducers/filters';


test('should set default state', ()=>{
    const state = filtersReducer(undefined, '@@INIT');
    expect(state).toEqual({
        text: '',
        sortBy: ''
    });
});

test('should handle SET_TEXT_FILTER', () => {
    const prevState = {
        text: '',
        sortBy: ''
    }
    const text = 'test'
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(prevState, action);
    expect(state).toEqual({
        text:'test',
        sortBy: ''
    });
});