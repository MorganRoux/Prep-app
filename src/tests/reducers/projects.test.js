import projectsReducer from '../../reducers/projects';
import { project } from '../fixtures/projects';


test('should set default state', () => {
    const action = {type: '@@INIT'};
    const state = projectsReducer({},action);
    expect(state).toEqual({});
})

test('should create project in the reducer', () => {
    const project = {name : 'testproject', id:'6'}
    const action = {
        type: 'CREATE_PROJECT',
        project
    };

    const newState = projectsReducer(null, action);
    expect(newState).toEqual([{
        ...project,
        role: '5'
    }]);
});

test('should remove project from the reducer', () => {
    const id = 'idp1';
    const action = {
        type: 'REMOVE_PROJECT',
        id
    };
    const state =[{
        name: 'project1',
        id: 'idp1',
        role: '5'
    }, {
        name: 'project2',
        id: 'idp2',
        role: '5'
    }];

    const newState = projectsReducer(state,action);
    expect(newState).toEqual([{
        name: 'project2',
        id: 'idp2',
        role: '5'
    }]);
});


test('should set projects data', () => {
    const action = {
        type: 'SET_PROJECT_DATA',
        project
    };
    const state = projectsReducer(null, action);
    expect(state).toEqual({
        id: 'idp1',
        name: 'projet1',
        staff: [{
            id: '1625HT28',
            name: 'Morgan',
            email: 'mail@mail.com',
            role: '5'
        }, {
            id: 'oiiu567',
            name: 'Morgan2',
            email: 'mail2@mail.com',
            role: '5'
        }]
    });
})

