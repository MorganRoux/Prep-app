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

