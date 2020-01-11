import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import { Button, Icon, Header, Body, Right, Left, Title, Item, Card, CardItem } from 'native-base';
import * as firebase from "firebase/app";
import "firebase/auth";
import { FlatList } from 'react-native-gesture-handler';
import MovieCard from '../components/movieCard';
import TMDBApiKey from '../apiKeys'

class Home extends Component {

    state = {
        data: null,
        movies: [],
        page: 1
    }

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.props.navigation.setParams({ logout: this.logout });
        this.getData = this.getData.bind(this);
        this.saveMovie = this.saveMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        if (this.state.data != null && this.state.page > this.state.data.total_pages) {
            console.log('get data condition false');
            return
        }
        console.log('data loading from page ' + this.state.page);
        const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + TMDBApiKey + '&language=en-US&page=' + this.state.page + '&region=us'
        fetch(topRatedUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('data loaded on page ' + this.state.page);
            this.setState({ 
                data: responseJson, 
                movies: this.state.movies.concat(responseJson.results) 
            });
        })
        .catch(error => {
            console.log(error.message)
            Alert.alert(error.message)
        });
    }

    logout() {
        firebase.auth().signOut().then( () => {
            this.props.navigation.navigate('Login');
        } );
        console.log("Successfully logged out");
    }

    renderSeparator() {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#fca503"
            }}
          />
        );
    };

    saveMovie(movie) {
        // this.props.navigation.setParams({ movie: movie });
        // console.log('movie saved' + this.props.navigation.state.params.movie.title);
        this.props.screenProps.addFavoriteMovie(movie);
    }

    removeMovie(movie) {
        this.props.screenProps.removeFavoriteMovie(movie);
    }

    navigateToMovieScreen = (movie) => {
        this.props.navigation.navigate('Movie', { movie: movie });
    }

    render() {
        return(
            <View style={styles.container}>
                <Header style={{ backgroundColor: '#fca503' }} androidStatusBarColor='#fca503'>
                    <Body style={{ paddingStart: 20 }}>
                        <Title style={{ color: '#fff' }}>Home</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.logout}>
                            <Icon style={{ color: '#fff' }} name='logout' type='SimpleLineIcons' />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1 }}>
                    <FlatList 
                    style={{ marginVertical: 5, marginHorizontal: 5 }}
                    data={this.state.movies}
                    renderItem={({ item }) => <MovieCard
                                                 movie={ item } 
                                                 isSaved={ (movie) => { 
                                                     return this.props.screenProps.favoriteMovies.includes(movie)
                                                  }} 
                                                 saveMovie={ this.saveMovie }
                                                 removeMovie={ this.removeMovie }
                                                 navigateToMovieScreen={ this.navigateToMovieScreen } />}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={() => <View></View>}
                    onEndReached={() => {
                        this.setState(
                            {page: this.state.page+1},
                            this.getData
                        );
                    }}
                    ListFooterComponent={() => {
                        return(
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <ActivityIndicator color='#fca503' size='large' />
                            </View>
                        )
                    }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginButton: {
        marginHorizontal: 20,
        marginBottom: 20,
    }
});

export default Home;