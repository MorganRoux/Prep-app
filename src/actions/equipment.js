import database from '../firebase/firebase';
import { validateItem } from '../selectors/equipment';

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
});

export const startAddEquipment = ({category, stockName, quantity, list}) => {

    //item is not a kit
    if(category !== 'kit')
    {
        // update the database
        return (dispatch) => {
            return database.ref('equipments')
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
    else if (category === 'kit') {
        
        const kitName = stockName;

        return (dispatch) => {
            const promiseList=[];
            //build up the list of all the item to add
            // add the kit to the database
            return database.ref('equipments')
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
                        return database.ref('equipments').push({
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
    return (dispatch) => {
        return database.ref('equipments')
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