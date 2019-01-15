

const projectsDefaultState = null; //projects;

const projectReducer = ( state = projectsDefaultState, action ) => {

    switch(action.type) {
    
    case 'REMOVE_PROJECT' :
        return null;

    case 'SET_PROJECT' : 
        return action.project;

    case 'CREATE_PROJECT' :
        return action.project;
        
    case 'SET_CURRENT_PROJECT': 
        const {id, name, staff: staff0} = action.project;
        const staff = Object.keys(staff0).map( (key) => ({id: key, ...staff0[key]}));
        return {id, name, staff}

    case 'NO_CURRENT_PROJECT' :
        return null

    default:
        return state;
    }
}

export default projectReducer