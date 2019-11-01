import React, {Component, useState} from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Screen</Text>
      <Input
        errorStyle={styles.inputError}
        errorMessage='Enter a valid email address'
        onChangeText={(value) => setEmail(value)}
      />
      <Input
        placeholder='Password'
        errorStyle={styles.inputError}
        errorMessage='Password must be at least 4 characters'
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <Button 
        title="New User?  Click to Sign Up." 
        onPress={() => this.props.navigation.navigate('SignUp')}
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
  }
});

export default Login;