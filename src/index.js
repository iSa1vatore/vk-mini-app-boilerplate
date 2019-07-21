import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './js/store/reducers';

import {setStory} from "./js/store/router/actions";

import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';

import App from './App';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

store.dispatch(setStory('home', 'base'));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);