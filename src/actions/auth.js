export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFail = (error) => {
    return {
        type: LOGOUT_FAIL,
        payload: error
    }
}

export const login = () => {
    return (dispatch) => {
        if (1 === 1) {
            localStorage.setItem('isAuthenticated', true);
            dispatch(loginSuccess());
        } else {
            dispatch(loginFail('Something was wrong. Please try again'))
        }
    }
}

export const logout = () => {
    return (dispatch) => {
        if (1 === 1) {
            localStorage.removeItem('isAuthenticated');
            dispatch(logoutSuccess());
        } else {
            dispatch(logoutFail('Something was wrong. Please try again'))
        }
    }
}