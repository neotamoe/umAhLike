import React, {useEffect, useState} from 'react';
import { SafeView, View, ScrollView, Text, StyleSheet, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

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

  removeEvent = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(`error removing ${key} from AsyncStorage: ${e}`)
    }
    console.log('done with remove event function')
    getAllData();
  }

  return (
    <View>
      <NavigationEvents 
        onWillFocus={payload => {
          getAllData();
        }}
      />
      {
      events.length > 0 ?
      <FlatList 
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
      />
      : <Text style={styles.noEvents}>No speaker events saved.</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  event: {
    fontSize: 16
  },
  noEvents: {
    margin: 10,
    fontSize: 16
  }
});

Events.navigationOptions = ({ navigation }) => ({
  title: "UmAhLike",
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