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
        type: 'SET_PROJECT_DATA',
        project
});

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
       
