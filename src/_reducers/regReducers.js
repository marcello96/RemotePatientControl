import { actionsConstants } from '../_actions/actionsConstants';

const initialState = {};

export function registration(state = initialState, action) {
    switch (action.type) {
        case actionsConstants.REGISTER_REQUEST:
            return {
                registerInProgress: true
            };
        case actionsConstants.REGISTER_SUCCESS:
            return {
                registerInProgress: false,
                registerSuccessful: true
            };
        case actionsConstants.REGISTER_FAILURE: 
            return {
                registerInProgress: false,
                registerSuccessful: false
            };
        default:
            return state;
    }
}