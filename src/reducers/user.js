import uuid from 'uuid'
import { addKitActions } from '../tests/fixtures/actions';
const userDefaultState = {}
let projects =[];

const userReducer = (state = userDefaultState, action) => {
    switch(action.type) {
    case 'LOGIN' : 
        return { ...state, uid: action.uid};
    
    case 'LOGOUT' :
        return {...state, uid :''};

    case 'SET_CURRENT_PROJECT' :
        return {...state, currentProject: action.id};

    case 'SET_USER_DATA':
        return action.user;

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
         return {...state, projects}

    default:
        return state
    }

}

export default userReducer;