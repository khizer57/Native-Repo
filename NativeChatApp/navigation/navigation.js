// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/signup';
import Login from '../screens/login';
import Chat from '../screens/chat';
import Home from '../screens/home';

function HomeScreen(){
  return (
    <Home/>
  );
};


function SignUpScreen() {

  return (
      <SignUp/>
  );
}
function LoginScreen() {
    return (
        <Login/>
    );
  }
  function ChatScreen() {
    return (
        <Chat/>
    );
  }

const Stack = createNativeStackNavigator();

function AppNavigation() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;