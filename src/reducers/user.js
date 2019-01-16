
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
    {
        const projects = state.projects.filter( ({id}) => action.id !== id);
        return {...state, projects};
    }
    case 'CREATE_PROJECT' :
    {
        const {name, id } = action.project;
        let projects = [];
        if(state.projects !== undefined) {
        projects = [...state.projects, {name, id, role:'5'}]
        } else {
        projects = [{name, id, role:'5'}];
        }
         return {...state, projects, currentProject: id}
    }
    case 'UPDATE_PROJECT_NAME' :
    {
        const {id,name} = action.project;
        const projects = [];
        state.projects.forEach((project) => {
            if(project.id === id) {
                projects.push({...project, name});
            } else {
                projects.push(project);
            }
        });
        return {...state, projects}
    }
    default:
        return state
    }

}

export default userReducer;