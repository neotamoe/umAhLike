import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

const SavedEvent = ({navigation}) => {
  let valueObject = JSON.parse(navigation.getParam('value'));
  let valueObjectData = Object.entries(valueObject.ums);
  let keyStringAsArray = navigation.getParam('key').split(" -- ");
  let name = keyStringAsArray[1];
  let dateTime = keyStringAsArray[0];
  

  return (
    <View style={styles.container}>
      <View style={styles.grouping}>
        <Text style={styles.title}>Speaker: </Text>
        <Text style={styles.data}>{name}</Text>
      </View>
      <View style={styles.grouping}>
        <Text style={styles.title}>Date/Time: </Text>
        <Text style={styles.data}>{dateTime}</Text>
      </View>
      <Divider style={styles.divider}/>
      {valueObjectData.map((entry) => 
        <View style={[styles.grouping, styles.umGrouping]} key={entry[0]}>
          <Text style={styles.title}>{entry[0]}: </Text>
          <Text style={styles.data}>{entry[1]}</Text>
        </View>
      )}
    </View>
  )
};

SavedEvent.navigationOptions = ({navigation}) => {
  let keyStringAsArray = navigation.getParam('key').split(" -- ");
  let name = keyStringAsArray[1];
  return { title: name }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  grouping: {
    flexDirection: 'row',
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    width: '33%'
  },
  data: {
    fontSize: 20,
    width: '66%'
  },
  umGrouping: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10
  }
})

export default SavedEvent;