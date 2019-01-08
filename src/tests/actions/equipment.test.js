
import { removeEquipment, addEquipment, moveEquipment } from '../../actions/equipment';
import stocklist from '../fixtures/stocklist';

test('should setup removeEquipment action object', () => {
    const id = 2
    const action = removeEquipment(id);
    expect(action).toEqual({
        type: 'REMOVE_EQUIPMENT',
        id
    });
});


// test('should setup editEquipment action object', () => {
//     const id = 2
//     const action = editEquipment(id);
//     expect(action).toEqual({
//         type: 'EDIT_EQUIPMENT',
//         id
//     });
// });

test('should setup addEquipment action object', () => {
    const quantity = '2'
    const item = {...stocklist[1], quantity};
    
    const action = addEquipment(item);
    expect(action).toEqual({
        type: 'ADD_EQUIPMENT',
        item
    });
});

test('should setup moveEquipment action object', () => {
    const oldIndex = 5;
    const newIndex = 2;

    const action = moveEquipment(oldIndex, newIndex);
    expect(action).toEqual({
        type: 'MOVE_EQUIPMENT',
        oldIndex,
        newIndex
    });
})