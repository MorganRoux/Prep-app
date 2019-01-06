import uuid from 'uuid'

const equipments = [{
    category: 'microphone',
    quantity: 1,
    stockId: 0,                          // id of the corresponding element in stocklist (non unique)
    id: 'OJZIJDOIJAOD',            // key in the database (unique) => represent this element
    parentId: null,                // key in the database of the parent
    parentName: null
}, {
    category: 'microphone',
    quantity: 1,
    stockId: 1,
    id: 'OIJZUZKXKZ',
    parentId: null,
    parentName: null
}, {
    category: 'microphone',
    quantity: 5,
    stockId: 2,
    id: 'POIUYNBVBCFD',
    parentId: null,
    parentName: null
}, {
    category: 'kit',
    quantity: 1,
    stockId: 1,                          // id of the corresponding element in kits (non unique)
    id: 'PIUTRELJJGFHD',           // key in the database (unique) => represent this element
    parentId: null,
    parentName: null
},{
    category: 'microphone',
    quantity: 3,
    stockId: 2,
    id: 'JHDJZJNZOCN',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 10,
    stockId: 1,
    id: 'UATEREGEBDNK',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 5,
    stockId: 0,
    id: 'POIAYLKJSDB',
    parentId: 'PIUTRELJJGFHD',
    parentName: 'kit1'
}];

export default equipments