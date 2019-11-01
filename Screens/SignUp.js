import React, {Component} from 'react';
import { StatusBar, SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

class SignUp extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>SignUp Page</Text>
          <Button 
            title="Already Signed Up?  Click to Log In." 
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </SafeAreaView>
      </>
    )  
  }
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