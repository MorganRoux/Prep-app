import { createProject, removeProject, setProjectData, startFetchProjectData } from '../../actions/projects';
import { project } from '../fixtures/projects';
import user from '../fixtures/user';
import projectsReducer from '../../reducers/projects';
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

    