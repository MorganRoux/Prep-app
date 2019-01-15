import projectReducer from '../../reducers/projects';
import { project } from '../fixtures/projects';


test('should set default state', () => {
    const action = {type: '@@INIT'};
    const state = projectReducer({},action);
    expect(state).toEqual({});
})

test('should create project in the projectReducer', () => {
    const action = {
        type: 'CREATE_PROJECT',
        project
    };

    const newState = projectReducer(null, action);
    expect(newState).toEqual(project);
});

test('should remove project data from the projectReducer', () => {
    const id = 'idp1';
    const action = {
        type: 'REMOVE_PROJECT',
        id
    };
    const state = project;

    const newState = projectReducer(state,action);
    expect(newState).toBeNull;
});


test('should set projects data', () => {
    const action = {
        type: 'SET_PROJECT',
        project
    };
    const state = projectReducer(null, action);
    expect(state).toEqual(project);
});

test('should set current project', () => {
    const action = {
        type: 'SET_CURRENT_PROJECT',
        project: {
            id: 'idp1',
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
            }
        }
    };
    const state = projectReducer(null, action);
    expect(state).toEqual(project);
});

test('should empty current project', () => {
    const action = {
        type: 'NO_CURRENT_PROJECT'
    };
    const state = projectReducer(null, action);
    expect(state).toEqual(null);
});
