import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../actions/auth.js'

const isAuthenticated = localStorage.getItem('isAuthenticated');

const authReducer = (state = {
    isAuthenticated: isAuthenticated,
    errorMessage: ''
}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
}

export default authReducer;