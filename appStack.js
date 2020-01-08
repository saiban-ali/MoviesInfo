import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/login'
import homeStack from './homeStack';

const routeConfig = createSwitchNavigator({
  Login: {
    screen: Login
  },
  HomeStack: {
    screen: homeStack
  },
});

const AppNavigator = createAppContainer(routeConfig);

export default AppNavigator;