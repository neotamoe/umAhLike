import React, {useEffect, useState} from 'react';
import { SafeView, View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import SwipeableFlatList from '../Components/SwipeableFlatList';

const Events = ({navigation}) => {
  const [events, setEvents] = useState([]);

  getAllData = () => {
    AsyncStorage.getAllKeys().then((keys) => {
      return AsyncStorage.multiGet(keys)
        .then((result) => {
          result.sort().reverse();
          const eventObjects = result.map(event => JSON.parse(event[1]))
          setEvents(eventObjects)
        }).catch((e) =>{
          console.log(e);
        });
    });  
  }

  return (
    <View>
      <NavigationEvents 
        onWillFocus={payload => {
          getAllData()
        }}
      />
      {
      events.length > 0 ?
      <SwipeableFlatList 
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ListItem 
            key={index} 
            title={item.display}
            bottomDivider
            chevron={true}
            style={{height: 48}}
            onPress={() => navigation.navigate('EventDetails', {key: item.display, value: JSON.stringify(item)})}
          />
        )}
        renderRight={({item, index}) => (
          <Text 
            style={{width: 100, height: 48, backgroundColor: 'red', fontSize: 16, lineHeight: 48, textAlign: 'center'}}
            onPress={() => console.log('you pressed delete for', item.display)}
          >
            Delete
          </Text>
        )}
      />
      : <Text>No speaker events saved.</Text>
      }
    </View>
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
  }, 
});

export default Events;