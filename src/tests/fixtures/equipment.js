import uuid from 'uuid'

const equipments = [{
    category: 'microphone',
    quantity: 1,
    stockName: 'sm57',                          // stockName of the corresponding element in stocklist
    id: '-LVhrOS0O7i51j-Ky3g0',            // key in the database (unique) => represent this element
    // parentId: null,                // key in the database of the parent
    // parentName: null
}, {
    category: 'other',
    quantity: 1,
    stockName: 'B91',
    id: '-LVhrOS3pN-TfKOHWawV',
    // parentId: null,
    // parentName: null
}, {
    category: 'microphone',
    quantity: 5,
    stockName: 'B52',
    id: '-LVhrOS3pN-TfKOHWawW',
    // parentId: null,
    // parentName: null
}, {
    category: 'kit',
    quantity: 1,
    stockName: 'kit1',                          // id of the corresponding element in kits (non unique)
    id: '-LVhrOS4ykvYnzhPZ-1c',           // key in the database (unique) => represent this element
    // parentId: null,
    // parentName: null
},{
    category: 'microphone',
    quantity: 3,
    stockName: 'sm57',
    id: '-LVhrOS4ykvYnzhPZ-1d',
    parentId: '-LVhrOS4ykvYnzhPZ-1c',
    parentName: 'kit1'
},{
    category: 'microphone',
    quantity: 10,
    stockName: 'B52',
    id: '-LVhrOS4ykvYnzhPZ-1e',
    parentId: '-LVhrOS4ykvYnzhPZ-1c',
    parentName: 'kit1'
},{
    category: 'other',
    quantity: 5,
    stockName: 'B91',
    id: '-LVhrOS5eP1jImz3DntV',
    parentId: '-LVhrOS4ykvYnzhPZ-1c',
    parentName: 'kit1'
}];

export default equipments