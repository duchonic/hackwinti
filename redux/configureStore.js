import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { tasks } from './dishes';
import { comments } from './comments';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            tasks,
            comments,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

