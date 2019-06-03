import { actionsConstants } from '../_actions/actionsConstants';

const initialState = localStorage.getItem('user') ? { user: localStorage.getItem('username') } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case actionsConstants.LOGIN_REQUEST:
            return {
                loggingInProgress: true
            };
        case actionsConstants.LOGIN_SUCCESS:
            return {
                loggingInProgress: false,
                loggedIn: true,
                user: action.user
            };
        case actionsConstants.LOGIN_FAILURE: 
            return {
                loggingInProgress: false,
                loggedIn: false
            };
        case actionsConstants.LOGOUT: 
        return {
            loggedIn: false
        };
        default:
            return state;
    }
}