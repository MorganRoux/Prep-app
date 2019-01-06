

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