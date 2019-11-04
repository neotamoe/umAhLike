import React from 'react';
import { SafeView, View, ScrollView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

const Events = () => {
  const events = ['event1', 'event2', 'event3', 'event4', 'event5'];

  return (
    <ScrollView>
      {events.map((event, index) => (
        <ListItem 
          key={index} 
          title={event}
          bottomDivider
        />
    ))}
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