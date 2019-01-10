import uuid from 'uuid'

const equipments = [{
    category: 'microphone',
    quantity: 1,
    stockName: 'sm57',                          // stockName of the corresponding element in stocklist
    id: '1',                      // key in the database (unique) => represent this element
    parentId: null,                // key in the database of the parent
    parentName: null                //stockName of the parent
}, {
    category: 'other',
    quantity: 1,
    stockName: 'B91',
    id: '2',
    parentId: null,
    parentName: null
}, {
    category: 'microphone',
    quantity: 5,
    stockName: 'B52',
    id: '3',
    parentId: null,
    parentName: null
}, {
    category: 'kit',
    quantity: 1,
    stockName: 'kit1',                          // id of the corresponding element in kits (non unique)
    id: '4' ,                    // key in the database (unique) => represent this element
    parentId: null,
    parentName: null
},{
    category: 'microphone',
    quantity: 3,
    stockName: 'sm57',
    id: '5',       
    parentId: '4',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 10,
    stockName: 'B52',
    id: '6',         
    parentId: '4',
    parentName: 'kit1'
},{
    category: 'other',
    quantity: 5,
    stockName: 'B91',
    id: '7',
    parentId: '4',
    parentName: 'kit1'
}];

export default equipments