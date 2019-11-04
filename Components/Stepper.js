import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const Stepper = () => {
  const [value, setValue] = useState(0);

  return (
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.button}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>
          {value}
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  stepper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    // borderStyle: 'solid',
    // borderWidth: 5,
    // borderColor: 'purple',
  },
  value: {
    height: 60,
    padding: 20,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 60,
    borderRadius: 8,
  },
})

export default Stepper;