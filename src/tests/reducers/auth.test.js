import authReducer from '../../reducers/auth';


test('should handle LOGIN action', () => {
    const uid = '1234';
    const action = {
        type: 'LOGIN',
        uid
    }
    const newState = authReducer({uid:''},action);
    expect(newState).toEqual({uid:'1234'});
});

test('should handle LOGOUT action', () => {
    const action = {
        type: 'LOGOUT',
    }
    const newState = authReducer({uid:'124'},action);
    expect(newState).toEqual({uid:''});

});