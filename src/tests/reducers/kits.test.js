import kitsReducer from '../../reducers/kits';
import kits from '../fixtures/kits';


test('should set default state', ()=>{
    const state = kitsReducer(undefined, '@@INIT');
    expect(state).toEqual(kits);
});