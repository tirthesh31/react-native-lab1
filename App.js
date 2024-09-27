import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Home from './screens/Home/Home.jsx';
import Add from './screens/Add/Add.jsx';
import Status from './screens/Status/Status.jsx';
import { Image } from 'react-native';
import colors from './colors/Colors.js';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer> 
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.componentBackground,  
          },
          tabBarActiveTintColor: colors.component,        
          tabBarInactiveTintColor: colors.white,          
          tabBarIconStyle: colors.white,  
          headerShown: false
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/home.png')} 
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? colors.component : colors.white
                }}
              />
            ),
          }}
        />
        
        <Tab.Screen 
          name="Add" 
          component={Add} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/add.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? colors.component : colors.white
                }}
              />
            ),
          }}
        />

        <Tab.Screen 
          name="Status" 
          component={Status} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./assets/status.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? colors.component : colors.white
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
