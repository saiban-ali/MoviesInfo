import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Button, Text } from 'native-base'
import * as firebase from "firebase/app";
import "firebase/auth";

class Login extends Component {

    state = {
        email: '',
        password: '',
        animating: true,
        loginDisabled: true
    };

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.gotoHomeScreen = this.gotoHomeScreen.bind(this);
    }

    componentDidMount() {


        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Alert.alert(`Logged in as ${user.email}`)
                console.log(user.email);
                console.log('user already logged in');
                this.gotoHomeScreen();
                // this.setState({ isUserLoggedIn: true, firebaseUser: user, userEmail: user.email })
            } else {
                console.log('no user logged in');
                this.setState({ animating: false, loginDisabled: false });
            }
        });
        // const { currentUser } = firebase.auth()
        // console.log(currentUser)
        // if(currentUser) {
        //     console.log('user already logged in')
        //     this.gotoHomeScreen()
        // } else {
        //     console.log('no user logged in')
        //     this.setState({ animating: false })
        // }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    login() {
        this.setState({ animating: true, loginDisabled: true });
        console.log(`${this.state.email}`);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(() => {
                this.gotoHomeScreen();
            });
        })
        .catch(error => {
            console.log(error.message);
            this.setState({ animating: false, loginDisabled: false });
            Alert.alert("Login failed");
        });
    }

    gotoHomeScreen() {
        this.setState({ animating: false });
        this.props.navigation.navigate('Home');
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.heading}>
                    <View style={styles.headingText}>
                        <Text style={styles.text}>Login</Text>
                    </View>
                    <ActivityIndicator 
                    style={styles.indicator}
                    animating={this.state.animating}
                    hidesWhenStopped={true}
                    color='#fca503'
                    size='large'
                    style={{ marginVertical: 20 }} />
                </View>
                <View style={styles.form}>
                    <TextInput
                    style={styles.input}
                    label='Email'
                    value={this.state.email}
                    placeholder='Email'
                    onChangeText={email => this.setState({ email })} />

                    <TextInput
                    style={styles.input}
                    label='Password'
                    value={this.state.password}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })} />

                    
                    <Button
                    style={styles.loginButton}
                    rounded
                    onPress={this.login}
                    disabled={this.state.loginDisabled}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Button>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 2,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fca503',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    heading: {
        flex: 1,
    },
    headingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 32,
        color: '#fca503',
    },
    indicator: {
        flex: 1,
    },
    loginButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fca503',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: { 
        color: '#000', 
        width: '100%', 
        textAlign: 'center' 
    }
});

export default Login;