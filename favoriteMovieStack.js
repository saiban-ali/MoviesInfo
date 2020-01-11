import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Movie from './screens/movie';
import Favorites from './screens/favorites';

const routeConfig = {
    Favorites: {
        screen: Favorites,
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