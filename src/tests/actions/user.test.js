
import { login, logout, setCurrentProject } from '../../actions/user';

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

test('should handle currentproject action object', () => {
    const id = '7'
    const action = setCurrentProject(id);
    expect(action).toEqual({
        type: 'SET_CURRENT_PROJECT',
        id
    });
});

