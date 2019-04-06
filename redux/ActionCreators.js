import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            var error = new Error('Error' + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errorMsg = new Error(error.errorMsg);
        throw errorMsg;
    })
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = errMsg => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchTasks = () => (dispatch) => {

    dispatch(tasksLoading());

    return fetch(baseUrl + 'tasks')
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errMsg = new Error(error.message);
            throw errMsg;
      })
    .then(tasks => dispatch(addTasks(tasks)))
    .catch(error => dispatch(tasksFailed(error.message)));
};

export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});

export const tasksFailed = (errMsg) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errMsg
});

export const addTasks = (tasks) => ({
    type: ActionTypes.ADD_TASKS,
    payload: tasks
});

export const postFavorite = taskId => dispatch => {
    setTimeout(
        () => dispatch(addFavorite(taskId)),
        2000
    );
};

export const addFavorite = taskId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: taskId
});