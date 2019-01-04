import equipments from '../tests/fixtures/equipment';
const equipmentReducerDefaultState = equipments;

const equipmentsReducer = (state = equipmentReducerDefaultState, action) => {
    switch(action.type){

    case 'REMOVE_EQUIPMENT' :
        const newState = state.filter((equipment) => (action.key !== equipment.key) );
        return newState;
    
    case 'EDIT_EQUIPMENT' :
    case 'ADD_EQUIPMENT' :
    default:
        return state;
    }
}

export default equipmentsReducer