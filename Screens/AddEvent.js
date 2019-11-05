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
      <View style={styles.allSteppers}>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Um</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Ah</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Like</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>So</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>You Know</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>But</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>And</Text>  
        <Stepper />
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Anyway</Text>  
        <Stepper />
      </View>
    </View>

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
  },
  stepperLabel: {
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 18,
    color: 'purple',
    width: '80%'
  },
  stepperContainer: {
    width: '50%'
  },
  allSteppers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default AddEvent;