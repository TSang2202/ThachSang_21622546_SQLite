/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './srceens/Login';
import React from './node_modules/react-native';
import Classes from './srceens/Classes';
import SQLite from 'react-native-sqlite-storage';
import {DataClasses} from './data/dataClasses'
import { useState } from 'react';
import Register from './srceens/Register';
import AddClass from './srceens/AddClass';
import Details from './srceens/Details';
import AddStudent from './srceens/AddStudent';

                                     


export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Register' component={Register}/>
        
        <Stack.Screen name ="Login" component={Login}/>

        <Stack.Screen name='Classes' component={Classes}/>

        <Stack.Screen name='AddClass' component={AddClass}/>

        <Stack.Screen name='Details' component={Details}/>

        <Stack.Screen name='AddStudent' component={AddStudent}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
