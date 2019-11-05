import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import Stepper from '../Components/Stepper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(moment(date).format('MMM-DD-YYYY'));
  const [formattedTime, setFormattedTime] = useState(moment(date).format('h:mm A'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder='Enter speaker name'
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Date: {formattedDate} {formattedTime}</Text>
      <View>
        <Button onPress={() => {
          setShow(true); 
          setMode('date')
        }} title="Edit Date" />
      </View>
      <Text>Time: {formattedTime}</Text>
      <View>
        <Button onPress={() => {
          setShow(true);
          setMode('time');
        }} title="Edit Time" />
      </View>
        { show && <DateTimePicker value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            console.log(date);
            setDate(date);
            setFormattedDate(moment(date).format('MMM-DD-YYYY'));
            setFormattedTime(moment(date).format('h:mm A'));
            setShow(false);
          }} />
        }
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