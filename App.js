import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux'

//action creator
function toggleShowText() {
  return new Promise(function(resolve, reject){
    setTimeout(() => resolve({ type: 'Toggle' }));
  });
}

function showText(state = true, action) {
  switch (action.type) {
    case 'Toggle':
      return !state;
    default:
      return state;
  }
}

function text(state = 'show me', action) {
  return state;
}

//reducer
const showTextApp = combineReducers({
  showText,
  text
})

const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action)
  }

  return Promise.resolve(action).then(store.dispatch)
}

let store = createStore(
  showTextApp,
  applyMiddleware(
    vanillaPromise
  )
);

const Blink = ({ text, showText, onTodoClick }) => {
  return (<Text onClick={onTodoClick}>
    {showText ? text : ' '}
    </Text>);
};

const mapStateToProps = state => {
  return {
    showText: state.showText,
    text: state.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

const CBlink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blink);

export default class BlinkApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <CBlink />
      </Provider>
    );
  }
}
