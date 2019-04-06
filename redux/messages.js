import * as ActionTypes from './ActionTypes';

export const messages = (state = {
    isLoading: true,
    errMsg: null,
    messages: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGES:
            return {...state, isLoading: false, errMsg: null, messages: action.payload};
        case ActionTypes.ADD_MESSAGE:
            return {...state, isLoading: false, errMsg: null, messages: messages.concat(action.payload)};
        case ActionTypes.MESSAGES_LOADING:
            return {...state, isLoading: true, errMsg: null, messages: []};
        case ActionTypes.MESSAGES_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, messages: []};
        default:
            return state;
    }
};
