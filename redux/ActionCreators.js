import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { appointments } from './appointments';

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

export const postTaskCompleted = task => dispatch => {
    return fetch(baseUrl + 'tasks/' + task.id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: task.name,
            category: task.category,
            description: task.description,
            dueDate: task.dueDate,
            completed: new Date().toISOString()
        })
    })
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
        .then(data => dispatch(removeTask(data)))
        .catch(error => console.log(error.message));
};

export const removeTask = (task) => ({
    type: ActionTypes.REMOVE_TASK,
    payload: task
});

// here comes the reward stuff
export const fetchRewards = () => (dispatch) => {

    dispatch(rewardsLoading());

    return fetch(baseUrl + 'rewards')
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
    .then(rewards => dispatch(addRewards(rewards)))
    .catch(error => dispatch(rewardsFailed(error.message)));
};

export const rewardsLoading = () => ({
    type: ActionTypes.REWARDS_LOADING
});

export const rewardsFailed = (errMsg) => ({
    type: ActionTypes.REWARDS_FAILED,
    payload: errMsg
});

export const addRewards = (rewards) => ({
    type: ActionTypes.ADD_REWARDS,
    payload: rewards
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


export const fetchMessages = () => (dispatch) => {
    return fetch(baseUrl + 'messages')
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
        .then(data => dispatch(addMessages(data)))
        .catch(error => console.log(error.message));
};

export const postMessage = messageText => dispatch => {
    return fetch(baseUrl + 'messages', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            message: messageText,
            author: 'Harry H.',
            date: new Date().toISOString()
        })
    })
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
        .then(data => dispatch(addMessage(data)))
        .catch(error => console.log(error.message));
};

export const addMessages = messages => ({
    type: ActionTypes.ADD_MESSAGES,
    payload: messages
});
export const addMessage = message => ({
    type: ActionTypes.ADD_MESSAGE,
    payload: message
});
export const fetchAppointments = () => dispatch => {
    return fetch(baseUrl + 'appointments')
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
        .then(data => dispatch(addAppointments(data)))
        .catch(error => console.log(error.message));
}
export const addAppointments = appointments => ({
    type: ActionTypes.ADD_APPOINTMENTS,
    payload: appointments
});

export const clearAll = () => dispatch => {
    dispatch({type: ActionTypes.CLEAR_ALL});
};
