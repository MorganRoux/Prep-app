
const equipmentReducerDefaultState = [{
    category: 'microphone',
    brand: 'shure',
    description:'micro cardioide',
    quantity: 1,
    publicName: 'sm57',
    stockName: 'sm57A',
    id: 1
}, {
    category: 'microphone',
    brand: 'shure',
    description:'micro grosse caisse',
    quantity: 1,
    publicName: 'Beta91',
    stockName: 'B91',
    id: 2
}, {
    category: 'microphone',
    brand: 'shure',
    description:'micro grosse caisse',
    quantity: 5,
    publicName: 'Beta52',
    stockName: 'B52',
    id: 3
}];

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