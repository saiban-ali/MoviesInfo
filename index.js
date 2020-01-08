/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as firebase from "firebase/app";
import firebaseConfig from './config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
