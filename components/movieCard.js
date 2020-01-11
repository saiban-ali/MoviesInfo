import React, { PureComponent } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Icon, Header, Body, Right, Left, Title, Item, Card, CardItem } from 'native-base';

class MovieCard extends PureComponent {

    state = {
        saved: false
    };

    constructor(props) {
        super(props);
        this.renderSaveIcon = this.renderSaveIcon.bind(this);
        this.favoritePressed = this.favoritePressed.bind(this);
    }

    componentDidMount() {
        this.setState({ saved: this.props.isSaved(this.props.movie) })
    }

    renderSaveIcon() {
        this.setState({ saved: this.props.isSaved(this.props.movie) })
        if(this.state.saved) {
            return(
                <Icon style={{ color: '#fca503', fontSize: 20 }} name='heart' type='FontAwesome' />
            )
        } else {
            return(
                <Icon style={{ color: '#fca503', fontSize: 20 }} name='heart' type='Feather' />
            )
        }
    }

    favoritePressed(movie) {
        if(!this.state.saved) {
            this.props.saveMovie(movie);
        } else {
            this.props.removeMovie(movie);
        }
        this.setState({ saved: this.props.isSaved(this.props.movie) })
    }

    onMovieCardPressed = (movie) => {
        this.props.navigateToMovieScreen(movie);
    }

    render() {

        const { movie } = this.props;

        return(
            <Card>
                <TouchableOpacity onPress={ () => this.onMovieCardPressed(movie) }>
                    <CardItem>
                        <Left>
                            <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold'}}>{movie.title}</Text>
                        </Left>
                        <Right>
                            <Button style={{ backgroundColor: '#fff', elevation: 0 }}
                            onPress={ () => this.favoritePressed(movie) } >
                                {
                                    this.renderSaveIcon()
                                }
                            </Button>
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        <Image 
                        source={{ uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}` }}
                        style={{height: 200, width: null, flex: 1, resizeMode:'stretch'}} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon style={{ color: '#fca503', fontSize: 20 }} name='star-outlined' type='Entypo' />
                                <Text style={{ marginHorizontal: 5, }}>{movie.vote_average}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Text style={{ marginHorizontal: 5, }}>{movie.vote_count}</Text>
                                <Icon style={{ color: '#fca503', fontSize: 30 }} name='like' type='EvilIcons' />
                            </Button>
                        </Right>
                    </CardItem>
                </TouchableOpacity>
            </Card>
        );
    }
}

export default MovieCard;