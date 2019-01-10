export const addKitActions = [{
    type: 'ADD_EQUIPMENT',
    item: {
        category: 'kit',
        quantity: 1,
        stockName: 'kit1',                          // id of the corresponding element in kits (non unique)
        id: expect.any(String),                    // key in the database (unique) => represent this element
        parentId: null,
        parentName: null
    }
},{
    type: 'ADD_EQUIPMENT',
    item: {
        category: 'microphone',
        quantity: 3,
        stockName: 'sm57',
        id: expect.any(String),     
        parentId: expect.any(String),
        parentName: 'kit1'
    }
},{
    type: 'ADD_EQUIPMENT',
    item: {
        category: 'microphone',
        quantity: 10,
        stockName: 'B52',
        id: expect.any(String),         
        parentId: expect.any(String),
        parentName: 'kit1'
    }
},{
    type: 'ADD_EQUIPMENT',
    item: {
        category: 'other',
        quantity: 5,
        stockName: 'B91',
        id: expect.any(String),
        parentId: expect.any(String),
        parentName: 'kit1'
    }
}];

export const removeKitActions = [{
    type: 'REMOVE_EQUIPMENT',
    id: expect.any(String)
},{
    type: 'REMOVE_EQUIPMENT',
    id: expect.any(String)
},{
    type: 'REMOVE_EQUIPMENT',
    id: expect.any(String)
},{
    type: 'REMOVE_EQUIPMENT',
    id: expect.any(String)
}];