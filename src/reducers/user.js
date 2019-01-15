
const userDefaultState = {}
let projects =[];

const userReducer = (state = userDefaultState, action) => {
    switch(action.type) {
    case 'LOGIN' : 
        return { ...state, uid: action.uid};
    
    case 'LOGOUT' :
        return {...state, uid :''};

    case 'SET_CURRENT_PROJECT' :
        return {...state, currentProject: action.project.id};
    
    case 'NO_CURRENT_PROJECT' :
        return {...state, currentProject:''}

    case 'SET_USER_DATA':
        return {...state,...action.user};

    case 'REMOVE_PROJECT': 
        projects = state.projects.filter( ({id}) => action.id !== id);
        return {...state, projects};

    case 'CREATE_PROJECT' :
        const {name, id } = action.project;
        
        if(state.projects !== undefined) {
        projects = [...state.projects, {name, id, role:'5'}]
        } else {
        projects = [{name, id, role:'5'}];
        }
         return {...state, projects, currentProject: id}

    default:
        return state
    }

}

export default userReducer;