import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import HomeStyle from './HomeStyle';
import firebase from '../../Firebase/firebase';
import AddTask from '../Add/Add'; // Import the AddTask component

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // To hold the task for editing
  const [isEditing, setIsEditing] = useState(false); // To track if we are in "edit" mode

  useEffect(() => {
    // Fetch tasks from Firebase on component mount
    const fetchTasks = () => {
      try {
        firebase
          .database()
          .ref('tasks')
          .on('value', (snapshot) => {
            const data = snapshot.val();
            const tasksArray = data
              ? Object.keys(data).map((key) => ({
                  id: key,
                  ...data[key],
                }))
              : [];
            setTasks(tasksArray);
          });
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();

    // Clean up the listener on unmount
    return () => {
      firebase.database().ref('tasks').off();
    };
  }, []);

  const viewDetails = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task); // Set the selected task for editing
    setIsEditing(true); // Switch to "edit" mode
  };

  const deleteTask = async (taskId) => {
    try {
      await firebase.database().ref(`tasks/${taskId}/delete`).set(1);
      console.log('Task marked as deleted');
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await firebase.database().ref(`tasks/${taskId}/complete`).set(1);
      console.log('Task marked as completed');
    } catch (error) {
      console.error('Error completing task: ', error);
    }
  };

  const confirmCompleteTask = (taskId) => {
    Alert.alert(
      'Confirm Completion',
      'Are you sure the task is completed successfully?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Task completion canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => completeTask(taskId),
        },
      ],
      { cancelable: true }
    );
  };

  // Callback to exit "edit" mode after saving
  const handleTaskSubmit = () => {
    setIsEditing(false); // Exit edit mode
    setSelectedTask(null); // Clear selected task
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  // Define importance levels and their respective colors
  const importanceColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  };

  if (isEditing) {
    return (
      <AddTask
        task={selectedTask} // Pass the selected task for editing
        onSubmit={handleTaskSubmit} // Callback after task is edited
        onCancel={handleCancelEdit} // Cancel the editing
      />
    );
  }

  return (
    <View>
      <Text style={HomeStyle.header}>Your Tasks</Text>

      {tasks.length === 0 ? (
        <Text>No tasks available.</Text>
      ) : (
        tasks
          .filter((task) => task.complete === 0 && task.delete === 0)
          .map((task) => (
            <View key={task.id} style={HomeStyle.taskParentBackground}>
              <TouchableOpacity
                style={HomeStyle.taskBackground}
                onPress={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
              >
                {/* Render colored bullet based on importance */}
                <View
                  style={{
                    ...HomeStyle.bullet,
                    backgroundColor: importanceColors[task.importance],
                  }}
                />
                <Text style={HomeStyle.taskText}>{task.title}</Text>
                <TouchableOpacity onPress={() => confirmCompleteTask(task.id)}>
                  <Image
                    source={require('../../assets/tick.png')}
                    style={HomeStyle.icon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Conditionally render the buttons based on the selected task */}
              {selectedTask === task.id && (
                <View style={HomeStyle.buttonContainer}>
                  <TouchableOpacity
                    style={HomeStyle.actionButton}
                    onPress={() => viewDetails(task.id)} // Open the task in the editing form
                  >
                    <Text style={HomeStyle.buttonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={HomeStyle.actionButton}
                    onPress={() => deleteTask(task.id)}
                  >
                    <Text style={HomeStyle.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
      )}
    </View>
  );
}

export default Home;
