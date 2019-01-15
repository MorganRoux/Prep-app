import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';
//import project from '../tests/fixtures/projects';

export const startLogin = () => {
    //no need to be here, should stay with loginpage
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export const startLogout = () => {
    //no need to be here, should stay with equipemntheader
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

export const setUserData = (user) => {
    return {
        type: 'SET_USER_DATA',
        user
    }
}

export const setEquipementRef = (ref) => {
    return {
        type: 'SET_REF',
        ref
    }
}

export const startFetchUserData = (uid) => {
    return (dispatch) => {
        return database.ref(`users/${uid}`)
        .once('value')
        .then( (snapshot) => {

            //test if the user has already logged in
            if( !snapshot.exists() ) {
                throw Error('User not found');
            }

            const {currentProject, profile} = snapshot.val();
            const projectsData = [];
            snapshot.child('/projects').forEach((childSnapshot) => {

                projectsData.push({
                    id: childSnapshot.key,
                    name: childSnapshot.val().name,
                    role: childSnapshot.val().role
                });
            });
            dispatch(setUserData({
                uid,
                currentProject,
                profile,
                projects : projectsData
            }));
        });
    }
}

export const createProfile = (uid) => {
    return (dispatch) => {
        const newProfile = {
            uid,
            currentProject: 'idp1',
            profile: {
                name: 'Anonymous',
                email: 'unknown'
            },
            projects: {
                'idp1' : {
                    name: 'projet1',
                    role: '5'
                }
            }
        };
        return database.ref(`users/${uid}`).set(newProfile)
        .then( () => {
            dispatch(setUserData({
                uid,
                currentProject: 'idp1',
                profile: {
                    name: 'Anonymous',
                    email: 'unknown'
                },
                projects: [{
                    id: 'idp1',
                    name: 'projet1',
                    role: '5'
                }]
            })
        )});
    }
}