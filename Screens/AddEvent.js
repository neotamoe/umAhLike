import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, ScrollView, Dimensions, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Stepper from '../Components/Stepper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import ToggleSwitch from 'toggle-switch-react-native';
import { Overlay, Button } from 'react-native-elements';

const AddEvent = ({navigation}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(moment(date).format('MMM-DD-YYYY'));
  const [formattedTime, setFormattedTime] = useState(moment(date).format('h:mm A'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [ums, setUms] = useState([{"word": "um", "count": 0}, {"word": "ah", "count": 0}, {"word": "like", "count": 0}, {"word": "so", "count": 0}, {"word": "you know", "count": 0}]); // [{word: 'um', count: 0}]
  const [nameError, setNameError] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [comments, setComments] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUmsKeysObject, setNewUmsKeysObject] = useState({});
  const [topic, setTopic] = useState("");
  const {width, height} = Dimensions.get('window');

  onStepperChange = (value, id) => {
    let tempUms = [...ums]
    let index = tempUms.findIndex((obj) => obj["word"]==id);
    if(index !== -1) {
      tempUms[index] = {"word": id, "count": value}
    }
    setUms(tempUms)
    console.log(tempUms)
  }

  saveUms = async (name, ums) => {
    const itemToSave = {
        "ums": ums,
        "date": formattedDate,
        "time": formattedTime,
        "name": name,
        "display":`${formattedDate} ${formattedTime} -- ${name}`,
        "comments": comments,
        "topic": topic
    }
    try {
      await AsyncStorage.setItem(itemToSave.display, JSON.stringify(itemToSave))
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  umsHasAllValidStringWords = () => {
    for(let obj of ums){
      if(obj.word===""){
        return false;
      }
    }
    return true;
  }

  createNewUms = () => {
    let newUms = [];
    ums.forEach((obj) => { 
      if(obj.word!==""){
        newUms.push(obj);
      }
    });
    setUms(newUms);
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>Speaker Name: *</Text>
      <TextInput 
        style={ nameError ? styles.inputError : styles.input }
        placeholder='Enter speaker name'
        value={name}
        onChangeText={text => {
          setName(text)
          if(!text || text.trim()===""){ setNameError(true) }
          else if (nameError){ setNameError(false) }
        }}
      />
      <Text>Topic:</Text>
      <TextInput 
        style={ styles.input }
        placeholder='Enter topic (optional)'
        value={topic}
        onChangeText={text => {
          setTopic(text)
        }}
      />
      {/* consider looking at react native Switch instead of external dependency */}
      {/* <ToggleSwitch 
        isOn={showTimer}
        onColor="blue"
        label="Show Timer"
        labelStyle={{color: "black"}}
        onToggle={() => {
          setShowTimer(!showTimer)
        }}
      /> */}
      <View style={styles.dateTimeContainer}>
        <View style={styles.halfWidth}>
          <Text>Date: </Text>
          <Text style={styles.dateTime} onPress={() => {
            setShow(true);
            setMode(Platform.OS === 'ios' ? 'datetime' : 'date');
          }}>
            {formattedDate}
          </Text>
        </View>
        <View style={styles.halfWidth}>
          <Text>Time: </Text>
          <Text style={styles.dateTime} onPress={() => {
            setShow(true);
            setMode(Platform.OS === 'ios' ? 'datetime' : 'time');
          }}>
            {formattedTime}
          </Text>
        </View>
      </View>
        { show && <DateTimePicker value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            Platform.OS === 'ios' ? setShow(true) : setShow(false);
            setDate(date);
            setFormattedDate(moment(date).format('MMM-DD-YYYY'));
            setFormattedTime(moment(date).format('h:mm A'));
          }} 
          />
        }
        { show && Platform.OS === 'ios' 
          ? <Button 
              title="OK"
              onPress={() => setShow(false)} 
            /> 
          : null }
      <View style={styles.allSteppers}>
        {
          isEditing ?
          ums.map((umObject) => 
          <View style={styles.stepperContainer} key={umObject.word}>
            <Text style={styles.stepperLabel}>{umObject.word}</Text>
            <Stepper id={umObject.word} onChange={onStepperChange} value={umObject.count}/>
          </View>
          )
          : ums.sort((a,b) => a["word"].localeCompare(b["word"])).map((umObject) => 
            <View style={styles.stepperContainer} key={umObject.word}>
              <Text style={styles.stepperLabel}>{umObject.word}</Text>
              <Stepper id={umObject.word} onChange={onStepperChange} value={umObject.count}/>
            </View>
          )
        }
      </View>
      <Overlay 
        isVisible={isEditing} 
        width={width-20} 
        overlayStyle={styles.commentsOverlay}
      >
        <ScrollView>
        <Text style={styles.header}>Add/Edit Filler Words</Text>
        <Text>You can include up to 8 filler words.  You cannot edit a filler word with a value > 0.</Text>
        {
          ums.map((item, index) => 
          <View style={styles.dateTimeContainer} key={index}>
            <TextInput 
              editable={ums[index].count === 0}
              style={ [styles.input, styles.half] }
              value={item["word"]}
              autoCapitalize='none'
              onChangeText={text => {
                let tempUms = [...ums];
                let tempCount = ums[index].count;
                tempUms[index] = {"word": text, "count": tempCount};
                setUms(tempUms)  
              }}
            />
            <Text style={[styles.half, styles.overlayValue]}>Current Value: {item["count"]}</Text>
          </View>
          )
        }
        {
          (8 - ums.length) > 0 ?
          [...Array(8-ums.length)].map((e, i) =>             
          <TextInput 
            key={i}
            value={newUmsKeysObject[i]}
            style={ [styles.input, styles.half] }
            placeholder="Add Filler Word"
            autoCapitalize='none'
            onChangeText={text => {
              console.log(text);
              setNewUmsKeysObject({
                ...newUmsKeysObject,
                [i]: text
              })
            }}
          />)
          : <></>
        }
        <View style={styles.bottomButtonAnchor}> 

        <Button 
          title="OK"
          onPress={() => {
            setIsEditing(false)
            console.log(newUmsKeysObject);
            console.log(ums);
            let newKeys = Object.values(newUmsKeysObject);
            for(let newKey of newKeys){
              if(newKey !== ''){
                setUms([...ums, {"word": newKey, "count": 0}]);
              }
            }
            console.log("ums after adding new keys: ")
            console.log(ums);
            setNewUmsKeysObject({});
            if(!umsHasAllValidStringWords()){
              createNewUms();
            }
          }}
        />
        </View>
        </ScrollView>
      </Overlay>
      <View style={styles.bottomSectionContainer}>
      <Button 
        buttonStyle={styles.button}
        title="Add/Edit Filler Words"
        onPress={() => {
          setIsEditing(true);
        }}
      />
      { comments !== "" ?
        <>
          <Text>Comments:</Text>
          <Text style={styles.comments}>{comments}</Text>
        </>
        : <></>
      }
      {
        isCommentsVisible ? 
        <Overlay 
          isVisible
          width={width-20}
          overlayStyle={styles.commentsOverlay}
        >
          <View>
          <Text style={styles.header}>Comments</Text>
          <TextInput 
            style={ [styles.input, styles.inputInOverlay ] }
            placeholder='Enter comments (optional)'
            value={comments}
            multiline={true}
            onChangeText={text => {
              setComments(text)
            }}
          />
          <View style={styles.bottomButtonAnchor}> 
          <Button 
            title="OK"
            onPress={() => {
              setIsCommentsVisible(false);
            }}
          />
          </View>
          </View>
        </Overlay>
        : <Button 
            buttonStyle={styles.button}
            title={comments==="" ? "Add Comments" : "Edit Comments"}
            onPress={() => {
              setIsCommentsVisible(true);
            }}
          />
      }

      <Button 
        buttonStyle={[styles.button, styles.saveButton]}
        title="Save Event" 
        onPress={() => {
          if(!name || name.trim()==="") { 
            setNameError(true);
            return; 
          }
          saveUms(name, ums);
          navigation.navigate("Events");
        }}
      />
      </View>
    </View>
    </ScrollView>
  )
};

AddEvent.navigationOptions = {
  title: "Add Event"
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginLeft: 10,
    marginTop: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  inputError: {
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  stepperLabel: {
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 18,
    color: 'purple',
    width: '80%'
  },
  stepperLabelEditable: {
    color: 'red'
  },
  stepperContainer: {
    width: '50%'
  },
  allSteppers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  dateTime: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  dateTimeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  halfWidth: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row'
  },
  inputInOverlay: {
    height: '50%',
    fontSize: 16,
    marginRight: 0
  },
  half: {
    width: '50%'
  },
  overlayValue: {
    marginTop: 20
  },
  button: {
    marginBottom: 10,
    marginRight: 10
  },
  saveButton: {
    backgroundColor: 'green'
  },
  bottomSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  comments: {
    marginBottom: 10
  }, 
  bottomButtonAnchor: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentsOverlay: {
    height: '100%'
  }
})

export default AddEvent;