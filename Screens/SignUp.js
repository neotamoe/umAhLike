import React, {useState} from 'react';
import { StatusBar, SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>SignUp Page</Text>
          <Input
            value={email}
            placeholder='Email'
            // errorStyle={styles.inputError}
            // errorMessage='Enter a valid email address'
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            value={password}
            placeholder='Password'
            // errorStyle={styles.inputError}
            // errorMessage='Password must be at least 4 characters'
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <Input
            value={confirmPassword}
            placeholder='Confirm Password'
            // errorStyle={styles.inputError}
            // errorMessage='Password must be at least 4 characters'
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
          />
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
  }
});

export default SignUp;