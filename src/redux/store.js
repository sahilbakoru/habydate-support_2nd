import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
const sagaMiddleware = createSagaMiddleware()
const usedMiddleware = [sagaMiddleware]
const store = createStore(
    combineReducers({
        ...reducers
    }),
    composeWithDevTools(applyMiddleware(...usedMiddleware))
);
export default store;
