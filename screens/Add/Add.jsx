import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddStyle from './AddStyle';
import firebase from '../../Firebase/firebase';
import { ref, set } from 'firebase/database';
import { database } from '../../Firebase/firebase';

function Add() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImportance, setTaskImportance] = useState('');
  const [importanceOptions, setImportanceOptions] = useState([]);

  useEffect(() => {
    // Fetch importance levels from Firebase
    const fetchImportanceOptions = async () => {
      try {
        const response = await firebase.database().ref('/taskImportance').once('value');
        const data = response.val();
        
        
        const options = data ? Object.keys(data).map(key => ({
          label: key,
          value: data[key],
        })) : [];
        setImportanceOptions(options);
      } catch (error) {
        console.error("Error fetching importance levels: ", error);
      }
    };

    fetchImportanceOptions();
  }, []);

  const handleAddTask = () => {
    // Check if the input fields are filled
    if (!taskTitle || !taskDescription || !taskImportance) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields.", // The message to show
        [{ text: "OK" }] // Button to dismiss the alert
      );
      return; // Exit if any field is empty
    }
  
    const task = {
      title: taskTitle,
      description: taskDescription,
      importance: taskImportance,
      date: new Date().toISOString(), // Store current date and time in ISO format
    };
  
    /// Reference to the 'tasks' collection in Firebase
    const taskRef = firebase.database().ref('tasks/' + Date.now()); // Use a unique key based on the current timestamp
  
    // Store the task in Firebase
    taskRef.set(task)
      .then(() => {
        console.log("Task added successfully:", task);
        // Reset form fields after submission
        setTaskTitle('');
        setTaskDescription('');
        setTaskImportance('');
      })
      .catch((error) => {
        Alert.alert(
          "Something went wrong!!",
          "Please try again.", // Error message
          [{ text: "Try Again!" }] // Button to dismiss the alert
        );
      });
  };

  return (
    <View>
      <Text style={AddStyle.header}>Add Tasks</Text>
      <View style={AddStyle.container}>
          <TextInput
              style={AddStyle.input} 
              placeholder='Task Title'
              value={taskTitle}
              onChangeText={setTaskTitle}
          />
          <TextInput
              style={[AddStyle.input, { height: 100 }]} // Adjust height to fit at least 5 rows
              placeholder='Task Description'
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline={true} // Enable multiline input
              numberOfLines={5} // Suggest a minimum number of lines
              textAlignVertical="top" // Align text to the top
          />
          <Picker
              style={AddStyle.picker} 
              selectedValue={taskImportance}
              onValueChange={(itemValue) => setTaskImportance(itemValue)}
          >
              <Picker.Item label="Select Importance" value="" />
              {importanceOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.label} />
              ))}
          </Picker>
          <TouchableOpacity style={AddStyle.button} onPress={handleAddTask}>
              <Text style={AddStyle.buttonText}>Add Task</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default Add;

