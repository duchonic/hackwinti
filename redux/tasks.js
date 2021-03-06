import * as ActionTypes from './ActionTypes';

export const tasks = (state = {
    isLoading: true,
    errMsg: null,
    tasks: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TASKS:
            return {...state, isLoading: false, errMsg: null, tasks: action.payload};
        case ActionTypes.TASKS_LOADING:
            return {...state, isLoading: true, errMsg: null, tasks: []};
        case ActionTypes.TASKS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, tasks: []};
        case ActionTypes.REMOVE_TASK:
            return {...state, tasks: state.tasks.filter( task => task.id != action.payload.id)};
        default:
            return state;
    }
};
