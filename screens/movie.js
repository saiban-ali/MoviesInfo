import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Icon, Header, Container, Content, Left, Right, Title } from 'native-base';

class Movie extends Component {
    render() {

        const movie = this.props.navigation.getParam('movie');

        return(
            <Container>
                <View style={{ flex: 4, flexDirection: 'row' }}>
                    <View style={{ flex: 3, margin: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{movie.title}</Text>
                    </View>
                    <View style={{ flex: 2, margin: 10, elevation: 5, borderRadius: 10 }}>
                        <Image 
                            source={{ uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}` }}
                            style={{ height: null, width: null, flex: 1, resizeMode:'stretch', borderRadius: 10 }} />
                    </View>
                </View>
                <View style={{ flex: 5, margin: 10 }}>
                    <Text>{movie.overview}</Text>
                </View>
            </Container>
        );
    }
}

export default Movie;