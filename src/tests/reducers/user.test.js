import userReducer from '../../reducers/user';
import user from '../fixtures/user';
import { project } from '../fixtures/projects';

test('should handle LOGIN action', () => {
    const uid = '1234';
    const action = {
        type: 'LOGIN',
        uid
    }
    const newState = userReducer({uid:''},action);
    expect(newState.uid).toBe('1234');
});

test('should handle LOGOUT action', () => {
    const action = {
        type: 'LOGOUT',
    }
    const newState = userReducer({uid:'124'},action);
    expect(newState.uid).toBe('');

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
    const state = {uid: '12345', currentProject: '3'};
    const newState = userReducer(state, action);
    expect(newState.currentProject).toBe(project.id);

});

test('should empty current project ', () => {
    const action = {
        type: 'NO_CURRENT_PROJECT'
    };
    const state = {uid: '12345', currentProject: '3'};
    const newState = userReducer(state, action);
    expect(newState.currentProject).toBe('');

});

test('should set user data', () => {
    
    const action = {
        type: 'SET_USER_DATA',
        user
    };
    const state = userReducer(null, action);
    expect(state).toEqual(user);
});

test('should remove a project from the user profile', () => {
    const id= 'idp1'
    const action = {
        type: 'REMOVE_PROJECT',
        id
    };
    const state = userReducer(user, action);
    expect(state.projects).toEqual([{
        id: 'idp2',
        name : 'projet2',
        role: '5'
    }]);
});


test('should add a project in the user profile', () => {
    const action = {
        type: 'CREATE_PROJECT',
        project
    };
    const { uid, profile, currentProject } = user;
    const oldState = {
        uid,
        currentProject,
        profile
    }
    const {id, name} = project;
    const state = userReducer(oldState, action);
    expect(state).toEqual({
        ...oldState,
        projects: [{
            id,
            name,
            role:'5'
        }]
    });
});