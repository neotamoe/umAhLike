import React from 'react';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Events from './Screens/Events';
import AddEvent from './Screens/AddEvent';
import EventDetails from './Screens/EventDetails';

import Amplify, { I18n } from 'aws-amplify';
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
      App: AppStack,
    },
    {
      initialRouteName: 'App'
    }
  )
);