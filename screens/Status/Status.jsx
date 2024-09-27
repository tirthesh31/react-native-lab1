import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StatusStyle from './StatusStyle';
import firebase from '../../Firebase/firebase';

function Status() {
  const [taskStatus, setTaskStatus] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from Firebase on component mount
    const fetchTasks = () => {
      try {
        firebase.database().ref('tasks').on('value', (snapshot) => {
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

  const handleTask = (status) => {
    setTaskStatus(status);
  };

  const filteredTasks = () => {
    if (taskStatus === 1) return tasks; // All tasks
    if (taskStatus === 2) return tasks.filter(task => task.complete === 1); // Completed tasks
    if (taskStatus === 3) return tasks.filter(task => task.complete === 0); // Ongoing tasks
    return [];
  };

  // Define importance levels and their respective colors
  const importanceColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  };

  const viewDetails = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task); // Set the selected task for editing
    // setIsEditing(true); // Uncomment if you have an edit mode
  };

  const deleteTask = async (taskId) => {
    try {
      await firebase.database().ref(`tasks/${taskId}`).remove();
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as MM/DD/YYYY
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  
  return (
    <View>
      <Text style={StatusStyle.header}>Status</Text>
      <View style={StatusStyle.taskButtonView}>
        <TouchableOpacity style={StatusStyle.button} onPress={() => handleTask(1)}>
          <Text style={StatusStyle.buttonText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StatusStyle.button} onPress={() => handleTask(2)}>
          <Text style={StatusStyle.buttonText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={StatusStyle.button} onPress={() => handleTask(3)}>
          <Text style={StatusStyle.buttonText}>Ongoing</Text>
        </TouchableOpacity>
      </View>
      {filteredTasks().length === 0 ? (
        <Text>No tasks available.</Text>
      ) : (
        filteredTasks().map((task) => (
          <View key={task.id} style={StatusStyle.taskParentBackground}>
            <TouchableOpacity
              style={StatusStyle.taskBackground}
              onPress={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
            >
              <View
                style={{
                  ...StatusStyle.bullet,
                  backgroundColor: importanceColors[task.importance],
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={StatusStyle.taskText}>{task.title}</Text>
                <Text style={StatusStyle.taskDescription}>{task.description}</Text> 
                <Text style={StatusStyle.taskDate}>{formatDate(task.date)}</Text>
              </View>
              <TouchableOpacity onPress={() => confirmCompleteTask(task.id)}>
                <Image
                  source={require('../../assets/tick.png')}
                  style={StatusStyle.icon}
                />
              </TouchableOpacity>
            </TouchableOpacity>         
            {selectedTask === task.id && (
              <View style={StatusStyle.buttonContainer}>
                <TouchableOpacity
                  style={StatusStyle.actionButton}
                  onPress={() => viewDetails(task.id)} 
                >
                  <Text style={StatusStyle.buttonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={StatusStyle.actionButton}
                  onPress={() => deleteTask(task.id)}
                >
                  <Text style={StatusStyle.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))       
      )}
    </View>
  );
}

export default Status;
