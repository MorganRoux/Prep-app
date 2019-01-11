


export const createProject = (project) => ({
    type: 'CREATE_PROJECT',
    project
});

export const removeProject = (id) => ({
    type: 'REMOVE_PROJECT',
    id
});