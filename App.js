import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Events from './Screens/Events';
import AddEvent from './Screens/AddEvent';
import SavedEvent from './Screens/SavedEvent';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// TODO: redo using auth flow: example: https://reactnavigation.org/docs/en/auth-flow.html
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Events: {
    screen: Events
  },
  AddEvent: {
    screen: AddEvent
  },
  SavedEvent: {
    screen: SavedEvent
  }
},
{
  initialRouteName: "Login",
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
