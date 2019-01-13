import { projects } from '../tests/fixtures/projects';

const projectsDefaultState = null; //projects;

const projectReducer = ( state = projectsDefaultState, action ) => {

    switch(action.type) {
    
    case 'REMOVE_PROJECT' :
        return null;

    case 'SET_PROJECT' : 
        return action.project;
    default:
        return state;
    }
}

export default projectReducer