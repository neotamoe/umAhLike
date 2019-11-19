import React, {useState} from 'react';
import { StatusBar, SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { Input, Divider } from 'react-native-elements';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [authCode, setAuthCode] = useState('');

    // onChangeText = (authCode) => { 
    //   setAuthCode( authCode )
    // }
    signUp = (username, password, phoneNumber, email) => {
      console.log(`in signUp method: params: ${username}, ${password}, ${phoneNumber}, ${email}`)
      Auth.signUp({ 
        username: username,
        password: password,
        attributes: {
          phone_number: "+1"+phoneNumber,
          email: email
        }
      })
      .then(res => {
        console.log('successful signup: ', res)
      })
      .catch(err => {
        console.log('error signing up: ', err)
      })
    }

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
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>SignUp Page</Text>
          <Input
            value={username}
            placeholder='Username'
            autoCapitalize='none'
            // errorStyle={styles.inputError}
            // errorMessage='Enter a valid email address'
            onChangeText={(value) => setUsername(value)}
          />
          <Input
            value={email}
            placeholder='Email'
            autoCapitalize='none'
            // errorStyle={styles.inputError}
            // errorMessage='Enter a valid email address'
            onChangeText={(value) => setEmail(value)}
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
          {/* <Input
            value={confirmPassword}
            placeholder='Confirm Password'
            autoCapitalize='none'
            secureTextEntry={true}
            // errorStyle={styles.inputError}
            // errorMessage='Password must be at least 4 characters'
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
          /> */}
          <Input
            value={phoneNumber}
            placeholder='Phone Number'
            autoCapitalize='none'
            // errorStyle={styles.inputError}
            // errorMessage='Enter a valid email address'
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <Button 
            title="Sign Up" 
            onPress={() => signUp(username, password, phoneNumber, email)}
          />
          <Divider style={styles.divider}/>
          <Text style={styles.header}>Confirm SignUp</Text>
          <Text>After signing up above, you will receive a text message with an auth code.  Enter your auth code below.</Text>
          <Input
            value={authCode}
            placeholder='Auth Code'
            autoCapitalize='none'
            // errorStyle={styles.inputError}
            // errorMessage='Enter a valid email address'
            onChangeText={(value) => setAuthCode(value)}
          />
          <Button 
            title="Submit Code and Confirm User" 
            onPress={() => confirmUser(username, authCode)}
          />
          <Divider style={styles.divider}/>
          <Button 
            title="Already Signed Up?  Click to Log In." 
            onPress={() => navigation.navigate('Login')}
          />
        </SafeAreaView>
      </>
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
  divider: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'blue',
  },
});

export default SignUp;