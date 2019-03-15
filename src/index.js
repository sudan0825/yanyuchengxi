import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


//firebase configuration
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/storage';
import fbconfig from './config/firebase';

//redux configuration
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'

// Initialize Firebase

firebase.initializeApp(fbconfig);
//connect to redux store
//enable to use redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//combine reducer
const rootReducer = combineReducers({
    
})
//create store
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));




ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
