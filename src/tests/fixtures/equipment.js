import uuid from 'uuid'

const equipments = [{
    category: 'microphone',
    quantity: 1,
    stockName: 'sm57',                          // stockName of the corresponding element in stocklist
    id: 'OJZIJDOIJAOD',            // key in the database (unique) => represent this element
    parentId: null,                // key in the database of the parent
    parentName: null
}, {
    category: 'other',
    quantity: 1,
    stockName: 'B91',
    id: 'OIJZUZKXKZ',
    parentId: null,
    parentName: null
}, {
    category: 'microphone',
    quantity: 5,
    stockName: 'B52',
    id: 'POIUYNBVBCFD',
    parentId: null,
    parentName: null
}, {
    category: 'kit',
    quantity: 1,
    stockName: 'kit1',                          // id of the corresponding element in kits (non unique)
    id: 'PIUTRELJJGFHD',           // key in the database (unique) => represent this element
    parentId: null,
    parentName: null
},{
    category: 'microphone',
    quantity: 3,
    stockName: 'sm57',
    id: 'JHDJZJNZOCN',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 10,
    stockName: 'B52',
    id: 'UATEREGEBDNK',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'other',
    quantity: 5,
    stockName: 'B91',
    id: 'POIAYLKJSDB',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
}];

export default equipments