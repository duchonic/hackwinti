import * as ActionTypes from './ActionTypes';

export const appointments = (state = {
    isLoading: true,
    errMsg: null,
    appointments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_APPOINTMENTS:
            return {...state, isLoading: false, errMsg: null, appointments: action.payload};
        case ActionTypes.APPOINTMENTS_LOADING:
            return {...state, isLoading: true, errMsg: null, appointments: []};
        case ActionTypes.APPOINTMENTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, appointments: []};
        default:
            return state;
    }
};
