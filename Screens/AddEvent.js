import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Stepper from '../Components/Stepper';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(Date.now());

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder='Enter speaker name'
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Insert Date Picker Here</Text>
      <Stepper />
      <Stepper />
      <Stepper />
    </View>
  )
};

AddEvent.navigationOptions = {
  title: "Add Event"
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10
  }
})

export default AddEvent;