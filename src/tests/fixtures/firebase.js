import database from '../../firebase/firebase';


export const setupFirebase = () => {

    const equipmentsData = {
        '1' : {                         //ID
        category: 'microphone',
        quantity: 1,
        stockName: 'sm57',                          // stockName of the corresponding element in stocklist
        parentId: null,                // key in the database of the parent
        parentName: null                //stockName of the parent
        }, 
        '2' : {
        category: 'other',
        quantity: 1,
        stockName: 'B91',
        parentId: null,
        parentName: null
        },
        '3' : {
        category: 'microphone',
        quantity: 5,
        stockName: 'B52',
        parentId: null,
        parentName: null
        },
        '4' : {
        category: 'kit',
        quantity: 1,
        stockName: 'kit1',               
        parentId: null,
        parentName: null
        },
        '5' : {
        category: 'microphone',
        quantity: 3,
        stockName: 'sm57',      
        parentId: '4',
        parentName: 'kit1'
        },
        '6' : {
        category: 'microphone',
        quantity: 10,
        stockName: 'B52',   
        parentId: '4',
        parentName: 'kit1'
        },
        '7' : {
        category: 'other',
        quantity: 5,
        stockName: 'B91',
        parentId: '4',
        parentName: 'kit1'
        }
    };
    
    const usersData = {
        '1625HT28': {
            currentProject: 'idp1',
            
            profile: {
                name: 'Morgan',
                email: 'mail@mail.com'
            },

            projects : {
                'idp1' : {
                    name: 'projet1',
                    role: '5'
                },
                'idp2': {
                    name : 'projet2',
                    role: '5'
                }
            }
        }, 
        'oiiu567': {
            currentProject: 'idp2',
        
            profile: {
                name: 'Morgan2',
                email: 'mail2@mail.com'
            },

            projects : {
                'idp1' : {
                    name: 'projet1',
                    role: '5'
                },
                'idp2': {
                    name : 'projet2',
                    role: '5'
                }
            }
        }
    }

    const projectsData = {
        'idp1' : {
            name: 'projet1',
            staff: {
                '1625HT28': {
                name: 'Morgan',
                email: 'mail@mail.com',
                role: '5'
                }, 
                'oiiu567' : {
                name: 'Morgan2',
                email: 'mail2@mail.com',
                role: '5'
                }
            },
            equipments: equipmentsData
        },
        'idp2' : {
            name: 'projet2',
            staff: {
                '1625HT28': {
                name: 'Morgan',
                email: 'mail@mail.com',
                role: '5'
                }, 
                'oiiu567' : {
                name: 'Morgan2',
                email: 'mail2@mail.com',
                role: '5'
                }
            },
            equipments: equipmentsData
        }
    }

    return database.ref('users').set(usersData)
    .then( () => {
         return database.ref('projects').set(projectsData)
    });
}