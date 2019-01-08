import database from '../firebase/firebase';

export const removeEquipment = (id) => ({
    type: 'REMOVE_EQUIPMENT',
    id
}); 

export const editEquipment = () => ({
    type: 'EDIT_EQUIPMENT'
}); 

export const addEquipment = (item) => ({
    type: 'ADD_EQUIPMENT',
    item
})

export const moveEquipment = (oldIndex, newIndex) => ({
    type : 'MOVE_EQUIPMENT',
    oldIndex,
    newIndex
});

export const setEquipmentList = (equipments) => ({
    type : 'SET_EQUIPMENT_LIST',
    equipments
});

export const startFetchEquipmentList = () => {
    return (dispatch) => {
        return database.ref('equipments')
            .once('value')
            .then( (snapshot) => {
                const equipments = [];
                snapshot.forEach( (childSnapshot) => {
                    equipments.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setEquipmentList(equipments));
            });
    }
}