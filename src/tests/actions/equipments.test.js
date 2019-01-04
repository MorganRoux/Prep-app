
import { removeEquipment } from '../../actions/equipments';


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

// test('should setup addEquipment action object', () => {
//     const id = 2
//     const action = removeEquipment(id);
//     expect(action).toEqual({
//         type: 'ADD_EQUIPMENT',
//         id
//     });
// });