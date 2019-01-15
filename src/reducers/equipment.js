import uuid from 'uuid'
import { arrayMove } from 'react-sortable-hoc';

const equipmentReducerDefaultState = []; // equipments;

const addEquipment = (item, state) => {
    
    let newState = [...state];
    newState.push(item);
    return newState;
}

const equipmentsReducer = (state = equipmentReducerDefaultState, action) => {
    switch(action.type){

    case 'REMOVE_EQUIPMENT' :
        // remove all the item selected by the id or their parentId (if a kit is deleted)
        const newState = state.filter((equipment) => (action.id !== equipment.id) && (action.id !== equipment.parentId )  );
        return newState;

    case 'EDIT_EQUIPMENT' :

    case 'ADD_EQUIPMENT' :
        return addEquipment(action.item, state);

    case 'MOVE_EQUIPMENT' :
        return arrayMove(state, action.oldIndex, action.newIndex);
    
    case 'SET_EQUIPMENT_LIST':
        return action.equipments;

    case 'SET_CURRENT_PROJECT' :
    const equipments = action.project.equipments
        if(action.project.equipments) {
            return  Object.keys(equipments).map((key) => ({...equipments[key], id: key}) )
        } else {
            return []
        }

    case 'CREATE_PROJECT':
        return [];
        
    case 'REMOVE_PROJECT' :
        return [];

    default:
        return state;
    }
}

export default equipmentsReducer