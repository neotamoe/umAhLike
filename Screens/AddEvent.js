import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Stepper from '../Components/Stepper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const AddEvent = ({navigation}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(moment(date).format('MMM-DD-YYYY'));
  const [formattedTime, setFormattedTime] = useState(moment(date).format('h:mm A'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [ums, setUms] = useState({um: 0, ah: 0, like: 0, so: 0, youKnow: 0, but: 0, and: 0, anyway: 0});
  const [nameError, setNameError] = useState(false);
  
  onStepperChange = (value, id) => {
    // console.log(`${id} stepper changed to value -> ${value}`)
    setUms({
      ...ums, 
      [id]: value})

  }

  saveUms = async (name, ums) => {
    try {
      // await AsyncStorage.setItem(`${date}***${name}`, ums)
      await AsyncStorage.setItem(name, JSON.stringify(ums))
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Speaker Name:</Text>
      <TextInput 
        style={ nameError ? styles.inputError : styles.input }
        placeholder='Enter speaker name'
        value={name}
        onChangeText={text => {
          setName(text)
          if(!text || text.trim()===""){ setNameError(true) }
          else if (nameError){ setNameError(false) }
        }}
      />
      <View style={styles.dateTimeContainer}>
        <View style={styles.halfWidth}>
          <Text>Date: </Text>
          <Text style={styles.dateTime} onPress={() => {
            setShow(true);
            setMode(Platform.OS === 'ios' ? 'datetime' : 'date');
          }}>
            {formattedDate}
          </Text>
        </View>
        <View style={styles.halfWidth}>
          <Text>Time: </Text>
          <Text style={styles.dateTime} onPress={() => {
            setShow(true);
            setMode(Platform.OS === 'ios' ? 'datetime' : 'time');
          }}>
            {formattedTime}
          </Text>
        </View>
      </View>
        { show && <DateTimePicker value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            console.log(date);
            Platform.OS === 'ios' ? setShow(true) : setShow(false);
            setDate(date);
            setFormattedDate(moment(date).format('MMM-DD-YYYY'));
            setFormattedTime(moment(date).format('h:mm A'));
          }} 
          />
        }
        { show && Platform.OS === 'ios' 
          ? <Button 
              title="OK"
              onPress={() => setShow(false)} 
            /> 
          : null }
      <View style={styles.allSteppers}>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Um</Text>  
        <Stepper id="um" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Ah</Text>  
        <Stepper id="ah" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Like</Text>  
        <Stepper id="like" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>So</Text>  
        <Stepper id="so" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>You Know</Text>  
        <Stepper id="youKnow" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>But</Text>  
        <Stepper id="but" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>And</Text>  
        <Stepper id="and" onChange={this.onStepperChange}/>
      </View>
      <View style={styles.stepperContainer}>
        <Text style={styles.stepperLabel}>Anyway</Text>  
        <Stepper id="anyway" onChange={this.onStepperChange}/>
      </View>
    </View>
      <Button 
        title="Save Event" 
        onPress={() => {
<<<<<<< HEAD
          if(!name || name.trim()==="") { 
            setNameError(true);
            return; 
          }
          saveUms(name, ums);
          navigation.navigate("Events");
=======
          // navigation.navigate("Events");
>>>>>>> c37c5ba237dd70fdda07dbe8fd57fcfcc8a9cac3
          console.log("save button pressed");
          console.log('date:', date);
          console.log('name:', name);
          console.log('ums object:', ums);
          // TODO: add save functionality here
        }}
      />
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
    marginLeft: 10,
    marginTop: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
<<<<<<< HEAD
  inputError: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
=======
>>>>>>> c37c5ba237dd70fdda07dbe8fd57fcfcc8a9cac3
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
    flexWrap: 'wrap',
    marginTop: 10
  },
  dateTime: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  dateTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  halfWidth: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row'
  }
})

export default AddEvent;