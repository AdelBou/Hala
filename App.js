/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import RouterComponent from './src/Router';

export default class App extends Component {


    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: 'AIzaSyCmYNODijBzsDOUQIthB3uG364uwJXsQrQ',
            authDomain: 'chat-f6816.firebaseapp.com',
            databaseURL: 'https://chat-f6816.firebaseio.com',
            projectId: 'chat-f6816',
            storageBucket: 'chat-f6816.appspot.com',
            messagingSenderId: '50718337781'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <RouterComponent/>
            </Provider>
        );
    }
}


