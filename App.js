import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';

//action creator
function toggleShowText() {
  return { type: 'Toggle' };
}

function showText(state = true, action) {
  switch (action.type) {
    case 'Toggle':
      return !state;
    default:
      return state;
  }
}

//reducer
const showTextApp = combineReducers({
  showText
})

let store = createStore(showTextApp);

const Blink = ({ text, showText, onTodoClick }) => {
  return (<Text onClick={onTodoClick}>
    {showText ? text : ' '}
    </Text>);
};

const mapStateToProps = state => {
  return {
    showText: state.showText
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: () => {
      dispatch(toggleShowText())
    }
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' showText={true} onTodoClick={() => {}} />
        <Blink text='I love to blink' showText={true} onTodoClick={() => {}} />
      </View>
    );
  }
}
