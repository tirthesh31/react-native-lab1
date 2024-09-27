import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import HomeStyle from './HomeStyle';
import firebase from '../../Firebase/firebase'; // Ensure Firebase is imported

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from Firebase on component mount
    const fetchTasks = async () => {
      try {
        const response = await firebase.database().ref('tasks').once('value');
        const data = response.val();
        const tasksArray = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        })) : [];
        setTasks(tasksArray);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  const viewDetails = (taskId) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  // Define importance levels and their respective colors
  const importanceColors = {
    high: 'red',
    medium: 'orange',
    low: 'green',
  };

  return (
    <View>
      <Text style={HomeStyle.header}>Your Tasks</Text>
      
      {tasks.length === 0 ? (
        <Text>No tasks available.</Text>
      ) : (
        tasks.map((task) => (
          <View key={task.id} style={HomeStyle.taskParentBackground}>
            <TouchableOpacity style={HomeStyle.taskBackground} onPress={() => viewDetails(task.id)}>
              {/* Render colored bullet based on importance */}
              <View style={{ ...HomeStyle.bullet, backgroundColor: importanceColors[task.importance] }} />
              <Text style={HomeStyle.taskText}>{task.title}</Text>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/tick.png')}
                  style={HomeStyle.icon}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Conditionally render the buttons based on the selected task */}
            {selectedTask === task.id && (
              <View style={HomeStyle.buttonContainer}>
                <TouchableOpacity style={HomeStyle.actionButton}>
                  <Text style={HomeStyle.buttonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeStyle.actionButton}>
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
