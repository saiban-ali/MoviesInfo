import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Home from './screens/home';
import Favorites from './screens/favorites'
import { Icon } from 'native-base';

const routeConfig = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon style={{ color: tintColor }} name='home-outline' type='MaterialCommunityIcons' />
            )
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            tabBarLabel: 'Saved',
            tabBarIcon: ({ tintColor }) => (
                <Icon style={{ color: tintColor }} name='favorite-border' type='MaterialIcons' />
            )
        }
    }
};

const tabNavigatorConfig = {
    navigationOptions: {
        tabBarVisible: true
    },
    tabBarOptions: {
        activeTintColor: '#fca503',
        inactiveTintColor: 'grey',
        showIcon: true
    },
}

const bottomNavigator = createBottomTabNavigator(routeConfig, tabNavigatorConfig);
export default createAppContainer(bottomNavigator);