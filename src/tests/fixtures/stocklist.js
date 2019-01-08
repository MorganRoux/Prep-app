const stocklist = [{
    category: 'microphone',
    brand: 'shure',
    description:'micro cardioide',
    publicName: 'sm57',
    stockName: 'sm57',
    id: 1                       // id in the database (unique)
}, {
    category: 'other',
    brand: 'shure',
    description:'micro grosse caisse',
    publicName: 'Beta91',
    stockName: 'B91',
    id: 2
}, {
    category: 'microphone',
    brand: 'shure',
    description:'micro grosse caisse',
    publicName: 'Beta52',
    stockName: 'B52',
    id: 3
}, {
    category: 'kit',
    publicName: 'kit n1',
    stockName: 'kit1',
    description: 'un bon gros kit',
    list: [{
        category: 'microphone',
        quantity: 3,
        stockName: 'sm57'
    },{
        category: 'microphone',
        quantity: 10,
        stockName: 'B52'
    },{
        category: 'other',
        quantity: 5,
        stockName: 'B91'
    }],
    id: 1                
}];

export default stocklist