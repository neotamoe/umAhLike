import React, {useEffect, useState} from 'react';
import { SafeView, View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

const Events = () => {
  const [events, setEvents] = useState([]);

  getAllData = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          setEvents(result)
        }).catch((e) =>{
          console.log(e);
        });
    });  
  }

  return (
    <ScrollView>
      <NavigationEvents 
        onWillFocus={payload => {
          getAllData()
          console.log(payload)
        }}
      />
      {events.length > 0 ? 
        events.map((event, index) => (
        <ListItem 
          key={index} 
          title={event[0]}
          bottomDivider
        />
      ))
        : <ListItem key="empty" title="No speaker events saved." />
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  event: {
    fontSize: 16
  }
});

Events.navigationOptions = ({ navigation }) => ({
  title: "Events",
  headerTitleStyle: {
    fontSize: 24
  },
  headerRight: (
    <Button 
      title="Add"
      onPress={() => {
        console.log("add event button pushed")
        navigation.navigate('AddEvent')
      }}
    />
  ),
  headerRightContainerStyle: {
    paddingRight: 10
  }
});

export default Events;