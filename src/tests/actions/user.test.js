import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
    login, 
    logout, 
    startFetchUserData, 
    setUserData, 
    setEquipementRef, 
    createProfile,
    updateUser
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
                email: 'unknown'
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


test('should update user in the database', (done) => {
    const store= createMockStore({user});
    const user2 = {
        uid: 'ohzcoiug ',
        currentProject: 'idp25',
        
        profile: {
            name: 'Morgan3',
            email: 'mail3@mail.com'
        },

        projects : [{
            id: 'idp25',
            name: 'projet25',
            role: '5'
        }, {
            id: 'idp27',
            name : 'projet27',
            role: '5'
        }]
    }   
    store.dispatch(updateUser(user2)).then(() => {
        database.ref(`users/${user2.uid}`).once('value')
        .then( (snapshot) => {
            const action = store.getActions()[0];
            expect(action).toEqual({
                type : 'SET_USER_DATA',
                user: user2
            });
            const userData = {...snapshot.val(), uid:snapshot.key};
            const projectsData = Object.keys(userData.projects).map((key)=>({...userData.projects[key], id:key}));
            expect({...userData, projects: projectsData}).toEqual(user2);
            done();
        })
    });
})
