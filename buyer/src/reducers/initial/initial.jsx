const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    status: localStorage.getItem('token') ? true : false,
    notification:false
}

const reducerInitial = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RESTART_AUTH':
            return state
        case 'LOADING':
            return state
        case 'LOGIN_ERROR':
            return action.error
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return action.payload
        default:
            return state
    }
}

export default reducerInitial;
