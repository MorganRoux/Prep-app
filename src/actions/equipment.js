import database from '../firebase/firebase';

export const removeEquipment = (id) => ({
    type: 'REMOVE_EQUIPMENT',
    id
}); 

export const startRemoveEquipment = (id) => {

    return (dispatch, getState) => {
        // get the equipment description
        const equipments = getState().equipments;
        const projectId = getState().user.currentProject;
        const {category} = equipments.find((equipment) => (equipment.id === id));

        // item is not a kit
        if (category !== 'kit') {
            // delete from the database

            return database.ref(`projects/${projectId}/equipments/${id}`).remove()
            .then( () => {
                // delete from the reducer
                dispatch(removeEquipment(id));
            })
            .catch('error remove');
        }

        //item is a kit
        else {
            // remove the kit header from the database
            return database.ref(`projects/${projectId}/equipments/${id}`).remove()
            .then( () => {
                // delete from the reducer
                dispatch(removeEquipment(id));

                // scan the equipment list and delete all the items with corresponding
                // parentId
                return Promise.all(equipments.map( ({parentId = null, id: itemId}) => {
                    if (parentId === id) {
                        // delete from the database
                        return database.ref(`projects/${projectId}/equipments/${itemId}`).remove()
                        .then(() => {
                            // delete from the reducer
                            dispatch(removeEquipment(itemId));
                        });
                    }
                }));
            });
        }
    }
}

export const editEquipment = () => ({
    type: 'EDIT_EQUIPMENT'
}); 

export const addEquipment = (item) => ({
    type: 'ADD_EQUIPMENT',
    item
});

export const startAddEquipment = ({category, stockName, quantity, list}) => {

    //item is not a kit
    if(category !== 'kit')
    {
        // update the database
        return (dispatch, getState) => {
            const projectId = getState().user.currentProject;

            return database.ref(`projects/${projectId}/equipments`)
            .push({
                category,
                quantity,
                stockName,             // stockName of the corresponding element in stocklist
                parentId: null,        // key in the database of the parent
                parentName: null
            })
            .then( (ref) => {
                // update the reducer
                dispatch(addEquipment({
                    category,
                    quantity,
                    stockName,             
                    id : ref.key,
                    parentId: null,        
                    parentName: null
                }));
            });
        }
    }

    //item is a kit
    else {
        
        const kitName = stockName;

        return (dispatch, getState) => {
            const projectId = getState().user.currentProject;
            // add the kit to the database
            return database.ref(`projects/${projectId}/equipments`)
            .push({
                category,
                quantity,
                stockName,             // stockName of the corresponding element in stocklist
                parentId: null,        // key in the database of the parent
                parentName: null
                
            })
            .then( (ref) => {

                const kitId = ref.key
                // add the kit to the reducer
                dispatch(addEquipment({
                    category,
                    quantity,
                    stockName,             
                    id: kitId,
                    parentId: null,        
                    parentName: null
                }));
                
                // add the kit items to the database
                return Promise.all(
                    list.map( ({category, quantity, stockName}) => {
                        return database.ref(`projects/${projectId}/equipments`).push({
                            category,
                            quantity,
                            stockName,             
                            parentId: kitId,       
                            parentName: kitName
                        })
                        .then( (ref) => {
                            // add the kit items to the reducer
                            dispatch(addEquipment({
                                category,
                                quantity,
                                stockName,             
                                id: ref.key,
                                parentId: kitId,        
                                parentName: kitName
                            }));
                        });
                    })
                );
            })
        }
    }
}

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
    return (dispatch, getState) => {
        const projectId = getState().user.currentProject;

        return database.ref(`projects/${projectId}/equipments`)
            .once('value')
            .then( (snapshot) => {
                const equipments = [];
                snapshot.forEach( (childSnapshot) => {

                    equipments.push({
                        id: childSnapshot.key,
                        parentId: null,
                        parentName: null,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setEquipmentList(equipments));
            });
    }
}