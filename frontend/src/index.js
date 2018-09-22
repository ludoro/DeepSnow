import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom';
import indexRoutes from './indexRoutes';
import configureStore, { history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const  stor= configureStore();
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {
                    indexRoutes.map((prop,key) => {
                            return (
                                <Route
                                    path={prop.path}
                                    key={key}
                                    component={prop.component}
                                />
                            );
                    })
                }
            </Switch>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
