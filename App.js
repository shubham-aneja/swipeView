/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Cards from './src/components/cards'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'

class App extends Component {
  render() {
    return (
      <Cards />
    );
  }
}

let store = createStore(rootReducer)
export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
