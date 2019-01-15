import database from '../firebase/firebase';



export const createProject = (project) => ({
    type: 'CREATE_PROJECT',
    project
});

export const removeProject = (id) => ({
    type: 'REMOVE_PROJECT',
    id
});

export const setProjectData = (project) => ({
        type: 'SET_PROJECT',
        project
});

export const setCurrentProject = (project) => {
    return {
        type: 'SET_CURRENT_PROJECT',
        project
    }
}

export const noCurrentProject = () => {
    return {
        type: 'NO_CURRENT_PROJECT'
    }
}

export const startFetchProjectData = (projectId) => {
    return (dispatch) => {
        return database.ref(`/projects/${projectId}`).once('value')
        .then( (snapshot) => {
            
            const name = snapshot.val().name;
            const id = snapshot.key;
            // get staff data
            const staffData = [];
            snapshot.child('/staff').forEach( (childSnapshot) => {
                const { name, email, role } = childSnapshot.val();
                staffData.push({
                    id: childSnapshot.key,
                    name,
                    email,
                    role
                });
            });
            dispatch(setProjectData({
                id,
                name,
                staff: staffData
            }));

        });
    }
}

export const startRemoveProject = (projectId) => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;

        return Promise.all([
            database.ref(`projects/${projectId}`).remove(),
            database.ref(`users/${uid}/projects/${projectId}`).remove()
        ]).then( () => dispatch(removeProject(projectId)));
    }
}

export const startCreateProject = () => {
    return (dispatch, getState) => {
        const {uid, profile} = getState().user;
        const {name, email} = profile
        const staff={};
        staff[uid] = {name, email, role:'5'}
        return database.ref('projects').push({
            name: 'New Project',
            staff
        })
        .then( (ref) => {

            return database.ref(`users/${uid}/projects/${ref.key}`)
            .set({
                name: 'New Project',
                role: '5'
            }).then( () => dispatch(createProject({
                name: 'New Project', 
                id: ref.key,
                staff: [{
                    uid,
                    name,
                    email,
                    role:'5'
                }]
            })));
        });
    }
    
}


