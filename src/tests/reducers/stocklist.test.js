import stocklistReducer, { equipementsReducer } from '../../reducers/stocklist';
import stocklist from '../fixtures/stocklist';


test('should set default state', ()=>{
    const state = stocklistReducer(undefined, '@@INIT');
    expect(state).toEqual(stocklist);
});