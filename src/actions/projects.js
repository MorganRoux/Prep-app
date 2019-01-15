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
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        return database.ref(`users/${uid}/currentProject`).set(project.id)
        .then(()=> {
            dispatch({
                type: 'SET_CURRENT_PROJECT',
                project
            });
        });
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
            const staffData = snapshot.val().staff;
            const staff = Object.keys(staffData).map( (key) => ({id: key, ...staffData[key]}));
            dispatch(setProjectData({
                id,
                name,
                staff
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

            return Promise.all([
                database.ref(`users/${uid}/projects/${ref.key}`)
                .set({
                    name: 'New Project',
                    role: '5'
                }),
                database.ref(`users/${uid}/currentProject`)
                .set(ref.key)
            ]).then( () => dispatch(createProject({
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


