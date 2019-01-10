
const authDefaultState = {
    uid: ''
}
const authReducer = (state = authDefaultState, action) => {
    switch(action.type) {
    case 'LOGIN' : 
        return { uid: action.uid}
    
    case 'LOGOUT' :
        return {uid :''}

    default:
        return state
    }

}

export default authReducer;