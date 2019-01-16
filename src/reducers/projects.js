

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
        const {id, name, staff: staffData} = action.project;
        const staff = Object.keys(staffData).map( (key) => ({id: key, ...staffData[key]}));
        return {id, name, staff}

    case 'NO_CURRENT_PROJECT' :
        return null;

    case 'UPDATE_PROJECT_NAME' :
        return {...state, name: action.project.name};

    default:
        return state;
    }
}

export default projectReducer