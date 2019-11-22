import React, {useState} from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [authCode, setAuthCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  signInAsync = async () => {
    // implement the aws stuff, then dynamically do:
    // await AsyncStorage.setItem('userToken', 'abc');
    console.log("here we'd be setting token in asyncStorage before navigating")
    navigation.navigate('App');
  }

  signIn = () => { 
    console.log(`in signIn method in login.js`)
    if(!username || !password){
      console.log("user must enter username and password--one of these is empty");
      setError("You must enter both username AND password to sign in.");
      setShowError(true);
      return;
    }
    Auth.signIn(username, password)
      .then(user => {
      // save user in state somewhere (or maybe in asyncstorage?)
        console.log(`user--> \n`);
        console.log(user)
        // await AsyncStorage.setItem('userToken', 'abc');
        setUser(user);
        const stringifiedUser = JSON.stringify(user);
        console.log('stringifiedUser:', stringifiedUser)
        navigation.navigate('AuthCode', {user: stringifiedUser})
      })
      .catch(err => {
        console.log('error signing in: ', err)
        // TODO: make this a more dynamic error
        setError('Oops.  Something went wrong.  Please try to sign in again.');
        setShowError(true);
      })
  }
  confirmSignIn = () => { 
    Auth.confirmSignIn(user, authCode)
      .then(user => {
        console.log('user: ', user);
        navigation.navigate('Events');
      }).catch(err => {
        console.log('error confirming sign in: ', err)
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please Sign In</Text>
      <Input
        value={username}
        placeholder='Username'
        autoCapitalize='none'
        // errorStyle={styles.inputError}
        // errorMessage='Enter a valid email address'
        onChangeText={(value) => setUsername(value)}
      />
      <Input
        value={password}
        placeholder='Password'
        autoCapitalize='none'
        secureTextEntry={true}
        // errorStyle={styles.inputError}
        // errorMessage='Password must be at least 4 characters'
        onChangeText={(text) => setPassword(text)}
      />
      <Button 
        title="Sign In"
        onPress={() => {
          console.log("sign in button pushed");
          // signInAsync();
          // navigation.navigate('Events');
          signIn();
        }}
      />
      {
        showError ? 
        <Text style={styles.inputError}>{error}</Text>        
        : <></>
      }
      <Divider style={styles.divider}/>
      <Input
        value={authCode}
        placeholder='Enter your Authentication Code'
        autoCapitalize='none'
        secureTextEntry={true}
        onChangeText={(text) => setAuthCode(text)}
      />
      <Button 
        title="Authenticate"
        onPress={() => {
          console.log("sign in with auth code button pushed");
          // signInAsync();
          // navigation.navigate('Events');
          confirmSignIn();
        }}
      />
      <Divider style={styles.divider}/>
      <Button 
        title="New User?  Click to Sign Up." 
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  )  

}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  inputError: {
    fontWeight: 'bold',
    color: 'red'
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'blue',
  },
});

export default withAuthenticator(Login, true);