import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import styling from '../styling'
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";




const styles = StyleSheet.create(styling)

function SignUp() {
  const [initializing, setInitializing] = useState(true);
  const [signUpObj, setSignUpObj] = useState({})
  const navigation = useNavigation();

  function onAuthStateChanged(user) {
    setSignUpObj(user);
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  if (initializing) return null;
  



  const signUp = () => {
    console.log(signUpObj)
    auth()
      .createUserWithEmailAndPassword(signUpObj.email, signUpObj.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
      navigation.navigate('Chat')
  }
  // Handle user state changes
 
  return(
      
          <>
          <View>
          <Text style={[styles.fs1, styles.textCenter, styles.py5]}>Sign Up</Text>
          <View style={[styles.py1, styles.px4]}>
          <TextInput onChangeText={(e) => setSignUpObj({ ...signUpObj, name: e })} placeholder="Name" style={styles.input}></TextInput>
          </View>
      <View style={[styles.py1, styles.px4]}>
        <TextInput onChangeText={(e) => setSignUpObj({ ...signUpObj, email: e })} placeholder="Email" style={styles.input}></TextInput>
      </View>
      <View style={[styles.py1, styles.px4]}>
        <TextInput onChangeText={(e) => setSignUpObj({ ...signUpObj, password: e })} placeholder="Password" style={styles.input}></TextInput>
      </View>
      <View style={[styles.py3, styles.px4]}>
        <TouchableOpacity onPress={signUp} style={[styles.btn]}>
          <Text style={styles.textCenter}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={[styles.textCenter]}>Already a User?</Text>
    <View style={[styles.px4, styles.py1]}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.btn]}>
        <Text style={styles.textCenter}>Click Here</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    
    </>
    
    );
  };
export default SignUp;