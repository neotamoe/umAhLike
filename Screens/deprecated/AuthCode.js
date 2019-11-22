import React, {useState} from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
// Amplify.configure(awsconfig);

const AuthCode = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [authCode, setAuthCode] = useState('');

  let userParam = JSON.parse(navigation.getParam('user'));
  console.log('userParam', userParam)

  confirmSignIn = () => { 
    console.log('in confirm sign in')
    console.log(userParam)
    console.log('authCode:', authCode)
    Auth.confirmSignIn(userParam, authCode, "SMS_MFA")
      .then(user => {
        console.log('user: ', user);
        navigation.navigate('Events');
      }).catch(err => {
        console.log('error confirming sign in: ', err)
      })
  };

  confirmUser = (username, authCode) => { 
    console.log(`in confirm user: with username: ${username} and authCode: ${authCode}`)
    Auth.confirmSignUp(username, authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your Authentication Code</Text>

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

export default AuthCode;