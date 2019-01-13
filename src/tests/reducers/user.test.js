import userReducer from '../../reducers/user';
import user from '../fixtures/user';

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

test('should set current project, and create new ref to the equipment database', () => {
    const id ='1';
    const action = {
        type: 'SET_CURRENT_PROJECT',
        id
    };
    const state = {uid: '12345', currentProject: '3'};
    const newState = userReducer(state, action);
    expect(newState.currentProject).toBe(id);

});


test('should set user data', () => {
    
    const action = {
        type: 'SET_USER_DATA',
        user
    };
    const state = userReducer(null, action);
    expect(state).toEqual(user);
});