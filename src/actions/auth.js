import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {

    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export const startLogout = () => {

    return () => {
        return firebase.auth().signOut();
    }
}

export const login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    }

}

export const logout = (uid) => {
    return {
        type: 'LOGOUT'
    }
}