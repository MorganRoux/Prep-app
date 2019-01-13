import uuid from 'uuid'
const userDefaultState = {}

const userReducer = (state = userDefaultState, action) => {
    switch(action.type) {
    case 'LOGIN' : 
        return { ...state, uid: action.uid}
    
    case 'LOGOUT' :
        return {...state, uid :''}

    case 'SET_CURRENT_PROJECT' :
        return {...state, currentProject:action.id}

    case 'SET_USER_DATA':
        return action.user;

    default:
        return state
    }

}

export default userReducer;