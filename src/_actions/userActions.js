import {actionsConstants} from './actionsConstants.js';
import {userService} from '../_services';

export const userActions = {
    login,
    logout,
    register
};

function login(credentials) {
    // return dispatch => {
    //     const { username, password } = credentials;
    //     dispatch(request(username));
    //
    //     userService.login(username, password)
    //         .then(user => {
    //             dispatch(success(username));
    //         },
    //         error => {
    //             dispatch(failure(error));
    //             window.alert('Something went wrong :(');
    //         });
    // };

    // function request(user) { return { type: actionsConstants.LOGIN_REQUEST, user } }
    // function success(user) { return { type: actionsConstants.LOGIN_SUCCESS, user } }
    // function failure(error) { return { type: actionsConstants.LOGIN_FAILURE, error } }
    const { username, password } = credentials;
    let user = userService.login(username, password);
    return { type: actionsConstants.LOGIN_SUCCESS, user }
}

function logout() {
    userService.logout();
    return { type: actionsConstants.LOGOUT };
}

function register(username, email, password) {
    console.log('registration of user' + username + 'in progress');
    return dispatch => {
        dispatch(request());
        userService.register(username, email, password)
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