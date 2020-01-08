import React, { Component } from 'react';
import Login from './screens/login';
import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import Navigator from './appStack'

class App extends Component {
  
  componentDidMount() {
    StatusBar.setBackgroundColor('#fca503');
    StatusBar.setBarStyle('light-content');
  }
  
  render() {
    return (
      <Navigator />
    );
  }
};

const styles = StyleSheet.create({
  
});

export default App;
