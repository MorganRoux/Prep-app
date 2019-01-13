import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
    login, 
    logout, 
    setCurrentProject, 
    startFetchUserData, 
    setUserData, 
    setEquipementRef, 
    createProfile,
    removeProject
} from '../../actions/user';
import user from '../fixtures/user';

import { setupFirebase } from '../fixtures/firebase'
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


beforeEach( (done) => {
  setupFirebase().then( ()=>done() ); 
   
});

test('should handle login action object ', () => {
    const uid = '1234';
    const action = login(uid);
    expect(action).toEqual({
        type : 'LOGIN',
        uid
    });
});

test('should handle logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type : 'LOGOUT',
    });
});

test('should handle currentproject action object', () => {
    const id = '7'
    const action = setCurrentProject(id);
    expect(action).toEqual({
        type: 'SET_CURRENT_PROJECT',
        id
    });
});


test('should handle set user data action object', () => {
    
    const action = setUserData(user);
    expect(action).toEqual({
        type: 'SET_USER_DATA',
        user
    })

})
test('should handle equipment ref action object', () => {
    const ref = database.ref(`projects/idp1/equipments`);
    const action = setEquipementRef(ref);
    expect(action).toEqual({
        type : 'SET_REF',
        ref
    });

});


test('should fetch user data',(done) => {

    const store = createMockStore({});
    const uid = '1625HT28';
    store.dispatch(startFetchUserData(uid))
    .then( () => {
        const action = store.getActions()[0];
        const userData = {
            uid,
            currentProject:'idp1',
            profile: {
                name: 'Morgan',
                email: 'mail@mail.com'
            },
            projects: [{
                    id: 'idp1',
                    name: 'projet1',
                    role: '5'
                },{
                    id: 'idp2',
                    name: 'projet2',
                    role :'5'
                }
            ]
        };
        expect(action).toEqual(setUserData(userData));
        done();
    });
   
});


test('should create new profile', (done) => {
    const uid = 'uidTest';
    const store = createMockStore({});

    store.dispatch(createProfile(uid)).then( () => {
        const action = store.getActions()[0];
        expect(action).toEqual(setUserData({
            uid,
            currentProject: 'idp1',
            profile: {
                name: 'Anonymous',
                mail: 'unknown'
            },
            projects: [{
                id: 'idp1',
                name: 'projet1',
                role: '5'
            }]
        }));
        done();
    });
});
