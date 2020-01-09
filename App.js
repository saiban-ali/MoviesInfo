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
  
  state = {
    favoriteMovies: []
  };

  componentDidMount() {
    StatusBar.setBackgroundColor('#fca503');
    StatusBar.setBarStyle('light-content');
    // this.addFavoriteMovie = this.addFavoriteMovie.bind(this);
    // this.removeFavoriteMovie = this.removeFavoriteMovie.bind(this);
    console.log(this.state);
  }

  addFavoriteMovie = (movie) => {
    console.log('adding to favorites');
    let newList = this.state.favoriteMovies;
    newList.unshift(movie);
    this.setState({
      favoriteMovies: newList
    });

    console.log(this.state.favoriteMovies);
  }

  removeFavoriteMovie = (movie) => {
    console.log('removing from favorites');
    console.log(this.state);
    let newList = this.state.favoriteMovies;
    console.log(newList);
    newList = newList.filter((item) => {
      return !(item === movie);
    });
    console.log(newList);
    this.setState({
      favoriteMovies: newList
    });
  }
  
  render() {
    return (
      <Navigator 
      screenProps={{
        ...this.state,
        addFavoriteMovie: this.addFavoriteMovie,
        removeFavoriteMovie: this.removeFavoriteMovie
      }} />
    );
  }
};

export default App;
