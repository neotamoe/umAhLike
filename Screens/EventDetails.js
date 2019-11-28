import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const EventDetails = ({navigation}) => {
  let valueObject = JSON.parse(navigation.getParam('value'));
  let umsArray = valueObject.ums;
  let keyString = navigation.getParam('key');
  let keyStringAsArray = keyString.split(" -- ");
  let name = keyStringAsArray[1];
  let dateTime = keyStringAsArray[0];
  
  removeEvent = async () => {
    try {
      AsyncStorage.removeItem(keyString);
    } catch(e) {
      console.error('oops, something happened in removing item from AsyncStorage:', e)
    }
    navigation.navigate('Events')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grouping}>
        <Text style={styles.title}>Speaker: </Text>
        <Text style={styles.data}>{name}</Text>
      </View>
      <View style={styles.grouping}>
        <Text style={styles.title}>Date/Time: </Text>
        <Text style={styles.data}>{dateTime}</Text>
      </View>
      <View style={styles.grouping}>
        <Text style={styles.title}>Topic: </Text>
        <Text style={styles.data}>{valueObject.topic}</Text>
      </View>
      <Divider style={styles.divider}/>
      {
        umsArray.map((entry) => 
          <View style={[styles.grouping, styles.umGrouping]} key={entry.word}>
            <Text style={styles.title}>{entry.word}: </Text>
            <Text style={styles.data}>{entry.count}</Text>
          </View>
        )
      }
      
      <View style={[styles.grouping, styles.umGrouping]} key={valueObject.comments}>
        <Text style={styles.title}>Comments: </Text>
        <Text style={styles.data}>{valueObject.comments}</Text>
      </View>
      <View style={styles.deleteButtonContainer}>
        <Button 
          title="Delete" 
          buttonStyle={styles.deleteButton} 
          onPress={ removeEvent }
        />
      </View>
    </SafeAreaView>
  )
};

EventDetails.navigationOptions = ({navigation}) => ({
  title: "Details"
});

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
  },
  deleteButton: {
    backgroundColor: 'red'
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  }
})

export default EventDetails;