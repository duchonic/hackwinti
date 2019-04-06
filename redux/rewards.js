import * as ActionTypes from './ActionTypes';

export const rewards = (state = {
    isLoading: true,
    errMsg: null,
    rewards: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REWARDS:
            return {...state, isLoading: false, errMsg: null, rewards: action.payload};
        case ActionTypes.REWARDS_LOADING:
            return {...state, isLoading: true, errMsg: null, rewards: []};
        case ActionTypes.REWARDS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, rewards: []};
        default:
            return state;
    }
};
