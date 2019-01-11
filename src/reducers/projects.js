import projects from '../tests/fixtures/projects';

const projectsDefaultState = projects;

const projectsReducer = ( state = projectsDefaultState, action ) => {

    switch(action.type) {
    case 'CREATE_PROJECT':
        return state ? ([
            ...state,
            {
                ...action.project,
                role:'5'
            }
        ]) : ([{
            ...action.project,
            role:'5'
        }]);
        

    case 'REMOVE_PROJECT' :
        return state.filter( (project) => (project.id !== action.id));

    default:
        return state;
    }
}

export default projectsReducer