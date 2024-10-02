import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddStyle from './AddStyle';
import firebase from '../../Firebase/firebase';

function Add({ task, onSubmit, onCancel }) {
  // Initialize state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImportance, setTaskImportance] = useState('');
  const [importanceOptions, setImportanceOptions] = useState([]);

  // Effect to update fields when a task is being edited
  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setTaskImportance(task.importance);
    } else {
      setTaskTitle('');
      setTaskDescription('');
      setTaskImportance('');
    }
  }, [task]);

  // Fetch importance levels from Firebase
  useEffect(() => {
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
    if (!taskTitle || !taskDescription || !taskImportance) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields.", // The message to show
        [{ text: "OK" }] // Button to dismiss the alert
      );
      return; // Exit if any field is empty
    }

    const taskData = {
      title: taskTitle,
      description: taskDescription,
      importance: taskImportance,
      date: new Date().toISOString(), // Store current date and time in ISO format
      complete: 0,
      delete:0
    };

    // Reference to the 'tasks' collection in Firebase
    const taskRef = task ? firebase.database().ref(`tasks/${task.id}`) : firebase.database().ref('tasks/' + Date.now()); // Use a unique key based on the current timestamp

    const saveTask = task ? taskRef.update(taskData) : taskRef.set(taskData);

    saveTask
      .then(() => {
        console.log("Task added/updated successfully:", taskData);
        setTaskTitle('');
        setTaskDescription('');
        setTaskImportance('');
        task ? onSubmit():null; // Call the onSubmit callback
        Alert.alert(
          "Task added successfully!!",
          "Please try again.", // Error message
          [{ text: "ok :)" }] // Button to dismiss the alert
        );
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
          <Text style={AddStyle.buttonText}>{task ? 'Edit Task' : 'Add Task'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Add;
