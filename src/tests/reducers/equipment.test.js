
import equipmentsReducer from '../../reducers/equipment';
import equipments from '../fixtures/equipment';

test('should set default state', ()=>{
    const state = equipmentsReducer(undefined, '@@INIT');
    expect(state).toEqual([]);
});

test('should remove equipement by id', ()=>{
    const id = equipments[1].id;
    const action = {
        type: 'REMOVE_EQUIPMENT',
        id
    }
    const state = equipmentsReducer(
        [equipments[0],equipments[1],equipments[2]],
        action);
    expect(state).toEqual([equipments[0], equipments[2]]);

});

test('should add equipment to the expense list', () => {
    const item = {
        category: 'microphone',
        quantity : '2',
        stockName: 'sm57',        
        id: expect.any(String),           
        parentId: null,       
        parentName: null
    }

    const action = {
        type: 'ADD_EQUIPMENT',
        item
    }
    const prevState = equipments;
    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual([...prevState, item])
});


test('should move equipment in the state', () => {
    const prevState = [
        equipments[0],
        equipments[1],
        equipments[2],
        equipments[3]
    ];
    const oldIndex = 2;
    const newIndex = 1;
    const action = {
        type: 'MOVE_EQUIPMENT',
        oldIndex,
        newIndex
    }

    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual([
        equipments[0],
        equipments[2],
        equipments[1],
        equipments[3]
    ]);

});

test('should set equipment list', () => {
    const prevState = [];
    const action = {
        type :'SET_EQUIPMENT_LIST',
        equipments
    }
    const state = equipmentsReducer(prevState, action);
    expect(state).toEqual(equipments);
})