import userReducer from '../../reducers/user';


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
    const id ='1';
    const action = {
        type: 'SET_CURRENT_PROJECT',
        id
    };
    const state = {uid: '12345', currentProject: '3'};
    const newState = userReducer(state, action);
    expect(newState.currentProject).toBe(id)
});