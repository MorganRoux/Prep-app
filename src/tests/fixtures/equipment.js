import uuid from 'uuid'

const equipments = [{
    category: 'microphone',
    quantity: 1,
    id: 0,
    key: 'OJZIJDOIJAOD',
    parentKey: null,
    parentName: null
}, {
    category: 'microphone',
    quantity: 1,
    id: 1,
    key: 'OIJZUZKXKZ',
    parentKey: null,
    parentName: null
}, {
    category: 'microphone',
    quantity: 5,
    id: 2,
    key: 'POIUYNBVBCFD',
    parentKey: null,
    parentName: null
}, {
    category: 'kit',
    quantity: 1,
    id: 1,
    key: 'PIUTRELJJGFHD',
    parentKey: null,
    parentName: null
},{
    category: 'microphone',
    quantity: 3,
    id: 2,
    key: 'JHDJZJNZOCN',
    parentKey: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 10,
    id: 1,
    key: 'UATEREGEBDNK',
    parentKey: 'PIUTRELJJGFHD',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 5,
    id: 0,
    key: 'POIAYLKJSDB',
    parentKey: 'PIUTRELJJGFHD',
    parentName: 'kit1'
}];

export default equipments