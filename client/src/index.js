import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import appReducer from './reducers/index';
import rootSaga from './sagas/index';

const sagaMiddleware=createSagaMiddleware();
const middlewares=[sagaMiddleware,logger];

const store=createStore(appReducer,applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
	<App/>
	</Provider>, root);
registerServiceWorker();

