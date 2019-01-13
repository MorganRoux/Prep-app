import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    removeEquipment, 
    startRemoveEquipment,
    addEquipment, 
    startAddEquipment,
    moveEquipment, 
    startFetchEquipmentList, 
    setEquipmentList 
} from '../../actions/equipment';
import stocklist from '../fixtures/stocklist';
import equipments from '../fixtures/equipment';
import projects from '../fixtures/projects';
import user from '../fixtures/user';
import { addKitActions, removeKitActions } from '../fixtures/actions';
import { setupFirebase } from '../fixtures/firebase'
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach( (done) => {
    setupFirebase().then( ()=>done() );
    
});

test('should setup removeEquipment action object', () => {
    const id = '2';
    const action = removeEquipment(id);
    expect(action).toEqual({
        type: 'REMOVE_EQUIPMENT',
        id
    });
});

test('should remove equipement from the database if it\'s not a kit', (done) => {

    const store = createMockStore({equipments, stocklist, projects, user});
    const projectId = 'idp1';
    const {id} = equipments[1];
    const action = {
        type: 'REMOVE_EQUIPMENT',
        id
    }
    store.dispatch(startRemoveEquipment(id))
    .then ( () => {
        // test if the action has been transmitted to the reducer
        const actions = store.getActions();
        

        // test if the database has been updated
        return database.ref(`projects/${projectId}/equipments/${id}`).once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toBeNull();
            expect(actions[0]).toEqual(action);
            done();
        });
    });
});

test('should remove equipment from the database if it\'s a kit', (done) => {
    const store = createMockStore({equipments, stocklist, projects, user});
    const {id} = equipments[3];
    const projectId = 'idp1';

    
    store.dispatch(startRemoveEquipment(id))
    .then (() => {
        // test if the actions has been transmitted to the reducer
        const actions = store.getActions();
        expect(actions).toEqual(removeKitActions);

        // test if the items has been removed from the database
        return database.ref(`projects/${projectId}/equipments`).once('value')
            .then ((snapshot) => {
                actions.forEach( ({id}) => {
                    expect(snapshot.child(id).val()).toBeNull();
                });
                done();  
            })                 
    })
});

test('should setup addEquipment action object', () => {
    const quantity = '2'
    const item = {...stocklist[1], quantity};
    
    const action = addEquipment(item);
    expect(action).toEqual({
        type: 'ADD_EQUIPMENT',
        item
    });
});

test('should add equipement to the database, if it\'s not a kit', (done) => {
    const store = createMockStore({equipments, stocklist, projects, user});
    const projectId = 'idp1';
    const equipmentData = {
        category: 'microphone',
        quantity: 3, 
        stockName: 'sm57'
    } 

    store.dispatch(startAddEquipment(equipmentData))
    .then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EQUIPMENT',
            item: {
                id: expect.any(String),
                ...equipmentData,
                parentId: null,
                parentName: null
            }
        });
        return database.ref(`projects/${projectId}/equipments/${actions[0].item.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            category : equipmentData.category,
            quantity: equipmentData.quantity,
            stockName: equipmentData.stockName
        });
        done();
    });
});

test('should add equipements to the database if it\'s a kit', (done) => {
    const store = createMockStore({equipments, stocklist, projects, user});
    const projectId = 'idp1';
    const equipmentData = {
        category: 'kit',
        quantity: 1,
        stockName: 'kit1',
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
        }]
    } 

    store.dispatch(startAddEquipment(equipmentData))
    .then( () => {

        // test the data passed to the reducer AND the parentId match
        const actions = store.getActions();
        expect(actions).toEqual(addKitActions);
        // AND the parentIds match
        const parentId = actions[0].item.id;
        actions.forEach((action) => {
            expect(action.item.parentId === parentId);
        });

        // Test the database has been updated correctly
        // Fetch the whole database and test every equipement added
        return database.ref(`projects/${projectId}/equipments`).once('value')
        .then((snapshot) => {
            actions.forEach( ({item}, index) => {

                if(index === 0 ) {
                    // kit header
                    expect(snapshot.child(item.id).val()).toEqual({
                        category : item.category,
                        quantity: item.quantity,
                        stockName: item.stockName
                    });

                }
                else {
                    // kit items
                    expect(snapshot.child(item.id).val()).toEqual({
                        category : item.category,
                        quantity: item.quantity,
                        stockName: item.stockName,
                        parentId: actions[0].item.id,
                        parentName: actions[0].item.stockName
                    });
                }
                
            });
            done();
        });
    })
});


test('should setup moveEquipment action object', () => {
    const oldIndex = 5;
    const newIndex = 2;

    const action = moveEquipment(oldIndex, newIndex);
    expect(action).toEqual({
        type: 'MOVE_EQUIPMENT',
        oldIndex,
        newIndex
    });
})

test('should setup setEquipmentList object', () => {
    const action = setEquipmentList(equipments);
    expect(action).toEqual({
        type: 'SET_EQUIPMENT_LIST',
        equipments
    });
});

test('should fetch equipment list from the database', (done) => {
    const store = createMockStore({equipments, stocklist, projects, user});
    
        store.dispatch(startFetchEquipmentList()).then( () => {
            const action = store.getActions();
            expect(action[0]).toEqual(setEquipmentList(equipments));
            done();
        });
    });
