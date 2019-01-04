
import { removeEquipment } from '../../actions/equipment';


test('should setup removeEquipment action object', () => {
    const key = 2
    const action = removeEquipment(key);
    expect(action).toEqual({
        type: 'REMOVE_EQUIPMENT',
        key
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

// test('should setup addEquipment action object', () => {
//     const id = 2
//     const action = removeEquipment(id);
//     expect(action).toEqual({
//         type: 'ADD_EQUIPMENT',
//         id
//     });
// });