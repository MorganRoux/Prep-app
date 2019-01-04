import equipments from '../tests/fixtures/equipments';
const equipmentReducerDefaultState = equipments;

const equipmentsReducer = (state = equipmentReducerDefaultState, action) => {
    switch(action.type){

    case 'REMOVE_EQUIPMENT' :
        const newState = state.filter((equipment) => (action.id !== equipment.id) );
        return newState;
    
    case 'EDIT_EQUIPMENT' :
    case 'ADD_EQUIPMENT' :
    default:
        return state;
    }
}

export default equipmentsReducer