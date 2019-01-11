
const userDefaultState = {
    uid: '',
    currentProject: ''
}
const userReducer = (state = userDefaultState, action) => {
    switch(action.type) {
    case 'LOGIN' : 
        return { ...state, uid: action.uid}
    
    case 'LOGOUT' :
        return {...state, uid :''}

    case 'SET_CURRENT_PROJECT' :
        return {...state, currentProject:action.id}
    default:
        return state
    }

}

export default userReducer;