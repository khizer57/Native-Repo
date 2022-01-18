import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import styling from '../styling'
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create(styling)

function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({})
  const navigation = useNavigation();

 // Handle user state changes
 function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  
  if (initializing) return null;
  
  return (
      <View>
          
    {user ? navigation.navigate('Chat') : navigation.navigate('SignUp')}
      </View>
  );
};

export default Home;