import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import styling from '../styling'
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";



const styles = StyleSheet.create(styling)

function Login() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({})

  const navigation = useNavigation(); 

  const login = () => {
    console.log(user)
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        console.log('User account signed in!');
        navigation.navigate('Chat')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  }
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    else (console.error)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

      return( 
        <>
    <View>
      <Text style={[styles.fs1, styles.textCenter, styles.py5]}>Login</Text>
      <View style={[styles.py1, styles.px4]}>
        <TextInput onChangeText={(e) => setUser({ ...user, email: e })} placeholder="Email" style={styles.input}></TextInput>
      </View>
      <View style={[styles.py1, styles.px4]}>
        <TextInput onChangeText={(e) => setUser({ ...user, password: e })} placeholder="Password" style={styles.input}></TextInput>
      </View>
      <View style={[styles.py3, styles.px4]}>
        <TouchableOpacity onPress={login} style={[styles.btn]}>
          <Text style={styles.textCenter}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
    )
}
export default Login;