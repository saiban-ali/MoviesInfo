import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './screens/home';
import Movie from './screens/movie';

const routeConfig = {
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
    Movie: {
        screen: Movie,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fca503'
            },
            headerTintColor: '#fff'
        }
    }
}

const navigator = createStackNavigator(routeConfig);
export default createAppContainer(navigator);