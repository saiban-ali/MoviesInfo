import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar } from 'react-native';
import { Button, Icon, Header, Body, Right, Title } from 'native-base';
import * as firebase from "firebase/app";
import "firebase/auth";

class Favorites extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.props.navigation.setParams({ logout: this.logout })
    }

    logout() {
        firebase.auth().signOut().then( () => {
            this.props.navigation.navigate('Login');
        } );
        console.log("Successfully logged out");
    }

    render() {
        return(
            <View style={styles.container}>
                <Header style={{ backgroundColor: '#fca503' }} androidStatusBarColor='#fca503'>
                    <Body style={{ paddingStart: 20 }}>
                        <Title style={{ color: '#fff' }}>Saved</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.logout}>
                            <Icon style={{ color: '#fff' }} name='logout' type='SimpleLineIcons' />
                        </Button>
                    </Right>
                </Header>
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

export default Favorites;