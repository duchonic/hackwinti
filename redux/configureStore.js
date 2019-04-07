import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { tasks } from './tasks';
import { rewards } from './rewards'
import { comments } from './comments';
import { favorites } from './favorites';
import { messages } from './messages';
import { appointments } from './appointments';
import * as ActionTypes from './ActionTypes';

export const ConfigureStore = () => {
    const appReducers = combineReducers({
        tasks,
        rewards,
        comments,
        favorites,
        messages,
        appointments
    });
    const rootReducer = (state, action) => {
        if (action.type === ActionTypes.CLEAR_ALL) {
            state = undefined;
        }

        return appReducers(state, action);
    }
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk, logger)
    );
    return store;
};
