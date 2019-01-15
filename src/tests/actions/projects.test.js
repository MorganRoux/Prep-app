import { 
    setCurrentProject,
    noCurrentProject,
    createProject, 
    startCreateProject,
    removeProject, 
    setProjectData, 
    startFetchProjectData, 
    startRemoveProject 
} from '../../actions/projects';
import { project } from '../fixtures/projects';
import user from '../fixtures/user';
import { setupFirebase } from '../fixtures/firebase'
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);


beforeEach( (done) => {
    setupFirebase().then( () => {
        done(); 
    }); 
});


test('should handle Create project action object', () => {
    const project = {name:'test', id: '4'};

    const action = createProject(project);
    expect(action).toEqual({
        type: 'CREATE_PROJECT',
        project
    });
});


// test('should handle set project action object', () => {
//     const action = setProject(id);
//     expect(action).toEqual({
//         type: 'SET_PROJECT',
//         id
//     });
// })

test('should handle remove project action object', () => {
    const id = '4';
    const action = removeProject(id);
    expect(action).toEqual({
        type: 'REMOVE_PROJECT',
        id
    });
});

test('should handle set projects action object', () => {
    const action = setProjectData(project)
    expect(action).toEqual({
        type: 'SET_PROJECT',
        project
    });

});

test('should handle remove project action object', () => {
    const id = 'lknsclkn';

    const action = removeProject(id);
    expect(action).toEqual({
        type: 'REMOVE_PROJECT',
        id
    });
});

test('should handle set current project action object and update the currenProject field in the database', (done) => {
    const store= createMockStore({user});
    store.dispatch(setCurrentProject(project)).then( () => {
        const action = store.getActions()[0];
        expect(action).toEqual({
            type: 'SET_CURRENT_PROJECT',
            project
        });
        database.ref(`users/${user.uid}/currentProject`).once('value')
        .then( (snapshot) => {
            expect(snapshot.val()).toBe(user.currentProject);
            done();
        });
    });
    
});

test("should handle no current project action object", () => {
    const action = noCurrentProject(project);
    expect(action).toEqual({
        type: 'NO_CURRENT_PROJECT'
    });
});

test('should handle create project action object', () => {
    const action = createProject(project)
    expect(action).toEqual({
        type: 'CREATE_PROJECT',
        project
    });
})

test('should fetch project data', (done) => {

    const store = createMockStore({user});
    const projectId = 'idp1'
    
    return store.dispatch(startFetchProjectData(projectId))
    .then( () => {
        const action = store.getActions()[0];
        expect(action).toEqual(setProjectData(project));
        done();
    });

});

test('should remove project from the database', (done) => {
    
    const store = createMockStore({user});
    const projectId = 'idp1';

    store.dispatch(startRemoveProject(projectId))
    .then( () => {

        const action = store.getActions()[0];
        expect(action).toEqual({
            type: 'REMOVE_PROJECT',
            id: projectId
        });

        const uid = store.getState().user.uid;
        return Promise.all([
            database.ref(`projects/${projectId}`).once('value')
                .then( 
                    (snapshot) => expect(snapshot.exists()).toBeFalsy()
                ),
            database.ref(`users/${uid}/projects/${projectId}`).once('value')
                .then( 
                    (snapshot) => expect(snapshot.exists()).toBeFalsy()
                )
        ]).then(() => done());
    });
});

test('should create project in the database and pass the action to the reducer', (done) => {
    const store = createMockStore({user});
    const {uid, profile } = store.getState().user;
    const { name, email } = profile;

    store.dispatch(startCreateProject())
    .then( () => {
        //test if the action has been passed to the store
        const action = store.getActions()[0];
        expect(action).toEqual(createProject({
                id: expect.any(String),
                name: 'New Project',
                staff: [{
                    uid,
                    name,
                    email,
                    role:'5'
                }]
            }));

        const projectId = action.project.id;
        //test if the project has been added to the databse
        return Promise.all([

            database.ref(`projects/${projectId}`).once('value')
            .then( (snapshot) => {
                const staff = {}
                staff[uid] = {name, email, role:'5'};
                expect(snapshot.val()).toEqual({
                name: 'New Project',
                staff
              });
            }),

            database.ref(`users/${uid}/projects/${projectId}`).once('value')
            .then( (snapshot) => {
                expect(snapshot.val()).toEqual({
                    name: 'New Project',
                    role: '5'
                });
            })
        ]).then( ()=>done() );
    });
});

    