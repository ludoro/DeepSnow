/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 10:37
 * @copyright: Niklas Kappler, 2018.
 */
import {createStore, compose, applyMiddleware} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    return createStore(
        connectRouter(history)(rootReducer),
        initialState,
        composeEnhancers(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            )
        )
    )
}