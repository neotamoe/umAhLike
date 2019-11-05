import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Stepper = () => {
  const [value, setValue] = useState(0);

  return (
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value}
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text>+</Text>
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
    width: '40%',
  },
  value: {
    height: 40,
    padding: 10,
    backgroundColor: 'white',
    lineHeight: 20,
    textAlign: 'center'
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
})

export default Stepper;