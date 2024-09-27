import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import HomeStyle from './HomeStyle';

function Home() {
  
  const [showDetails, setShowDetails] = useState(false)
  const viewDetails = () => {
    setShowDetails(!showDetails)
  } 
  return (
    <View>
      <Text style={HomeStyle.header}>Your Tasks</Text>
      <View style={HomeStyle.taskParentBackground}>
        <TouchableOpacity style={HomeStyle.taskBackground} onPress={viewDetails}>
          <Text style={HomeStyle.taskText}>First Task</Text>
          <TouchableOpacity>
              <Image
                source={require('../../assets/tick.png')}
                style={HomeStyle.icon}
              />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* Conditionally render the buttons based on state */}
        {showDetails && (
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
    </View>
  );
}

export default Home;
