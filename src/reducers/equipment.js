import equipments from '../tests/fixtures/equipment';
import uuid from 'uuid'
import { arrayMove } from 'react-sortable-hoc';

const equipmentReducerDefaultState = []; // equipments;

const addEquipment = ({category, stockName, quantity, list}, state) => {
    
    let newState = [...state];
    //item is not a kit
    if(category !== 'kit')
    {
        newState.push({
                category,
                quantity,
                stockName,             // stockName of the corresponding element in stocklist
                id: uuid(),            // key in the database (unique) => represent this element
                parentId: null,        // key in the database of the parent
                parentName: null
            }
        );
        
    }

    //item is a kit
    else if (category === 'kit') {
        const id = uuid();
        newState.push({
            category,
            quantity,
            stockName,
            id,
            parentId: null,
            parentName: null
        });
        
        list.forEach((item) => newState.push({
                category: item.category,
                quantity: item.quantity,
                stockName: item. stockName,
                id: uuid(),
                parentId: id,
                parentName: stockName
            })
        );
    }
    
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

    default:
        return state;
    }
}

export default equipmentsReducer