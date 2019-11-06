import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const Stepper = (props) => {
  const [value, setValue] = useState(0);
  const updateValue = e => {
    setValue({
      ...value,
      'fakeKey': e.nativeEvent.text
    });
  };
  return (
      <View style={styles.stepper}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if(value==0){ return }
            setValue(parseInt(value) - 1); props.onChange(parseInt(value)-1, props.id); 
          }}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <TextInput 
            id={props.id} 
            style={styles.value}
            onChange={(e) => { setValue(e.nativeEvent.text); props.onChange(e.nativeEvent.text,props.id)}}
          >
            {value} 
          </TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {setValue(parseInt(value) + 1); props.onChange(parseInt(value)+1, props.id); }}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 8,
    margin: 10,
    marginBottom: 30,
    width: '80%',
  },
  value: {
    height: 40,
    padding: 10,
    backgroundColor: 'white',
    lineHeight: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  valueContainer: {
    width: '34%'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    width: 40,
    height: 40,
    width: '33%',
  },
  buttonText: {
    fontSize: 24,
  }
})

export default Stepper;