import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

const SavedEvent = ({navigation}) => {
  let valueObject = JSON.parse(navigation.getParam('value'));
  console.log(valueObject);
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
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>Um: </Text>
        <Text style={styles.data}>{valueObject.ums.um}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>Ah: </Text>
        <Text style={styles.data}>{valueObject.ums.ah}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>Like: </Text>
        <Text style={styles.data}>{valueObject.ums.like}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>Anyway: </Text>
        <Text style={styles.data}>{valueObject.ums.anyway}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>And: </Text>
        <Text style={styles.data}>{valueObject.ums.and}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>You Know: </Text>
        <Text style={styles.data}>{valueObject.ums.youKnow}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>But: </Text>
        <Text style={styles.data}>{valueObject.ums.but}</Text>
      </View>
      <View style={[styles.grouping, styles.umGrouping]}>
        <Text style={styles.title}>So:</Text>
        <Text style={styles.data}>{valueObject.ums.so}</Text>
      </View>
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