import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { tasks } from './tasks';
import { rewards } from './rewards'
import { comments } from './comments';
import { favorites } from './favorites';
import { messages } from './messages';
import { appointments } from './appointments';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks,
            rewards,
            comments,
            favorites,
            messages,
            appointments
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
