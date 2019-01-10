
import { login, logout } from '../../actions/auth';

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


