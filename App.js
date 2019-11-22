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

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Events from './Screens/Events';
import AddEvent from './Screens/AddEvent';
import EventDetails from './Screens/EventDetails';
import AuthLoading from './Screens/AuthLoading';
import AuthCode from './Screens/AuthCode';

import Amplify, { Auth, I18n } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";

const footerHelpText = {
  en: {
    'Please Sign In / Sign Up': 'UmAhLike: Please Sign In or Sign Up'
  }
};

I18n.setLanguage('en');
I18n.putVocabularies(footerHelpText);

const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#0000ff' });
const MyButtonDisabled = Object.assign({}, AmplifyTheme.buttonDisabled, { backgroundColor: '#0000ff80' });
const MySectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, { color: 'blue' });
const MyTheme = Object.assign({}, AmplifyTheme, { 
  sectionFooterLink: MySectionFooterLink,
  button: MyButton, 
  buttonDisabled: MyButtonDisabled
});

const App = () =>  {
  return <AppContainer />;
}

export default withAuthenticator(App, false, [], null, MyTheme);

// const AuthStack = createStackNavigator({ Login: Login, SignUp: SignUp, AuthCode: AuthCode });

// using auth flow: example: https://reactnavigation.org/docs/en/auth-flow.html
const AppStack = createStackNavigator({
  Events: {
    screen: Events
  },
  AddEvent: {
    screen: AddEvent
  },
  EventDetails: {
    screen: EventDetails
  }
},
{
  initialRouteName: "Events",
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoading,
      App: AppStack,
      // Auth: AuthStack
    },
    {
      // initialRouteName: 'AuthLoading'
      initialRouteName: 'App'
    }
  )
);

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
