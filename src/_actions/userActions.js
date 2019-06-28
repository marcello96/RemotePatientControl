import {actionsConstants} from './actionsConstants.js';
import {userService} from '../_services';

export const userActions = {
    login,
    logout,
    register
};

function login(credentials) {
    return dispatch => {
        const { username, password } = credentials;
        dispatch(request(username));

        userService.login(username, password)
            .then(user => {
                dispatch(success(username));
            },
            error => {
                dispatch(failure(error));
                window.alert('Something went wrong :(');
            });
    };

    function request(user) { return { type: actionsConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionsConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionsConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: actionsConstants.LOGOUT };
}

function register(username, password, firstname, lastname) {
    console.log('registration of user' + username + 'in progress');
    return dispatch => {
        dispatch(request());
        userService.register(username, password, firstname, lastname)
            .then(() => {
                dispatch(success());
            }, 
            error => {
                dispatch(failure(error));
                window.alert('Something went wrong :( : ' + error);
            });
    };

    function request() { return { type: actionsConstants.REGISTER_REQUEST } }
    function success() { return { type: actionsConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: actionsConstants.REGISTER_FAILURE, error } }
}