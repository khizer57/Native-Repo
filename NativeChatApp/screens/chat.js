import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import styling from '../styling';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const reference = database().ref('/');


const styles = StyleSheet.create(styling)

function Chat() {
    const [db, setDb] = useState([]);
    const navigation = useNavigation();
    const signOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User Signed Out');
            })
        navigation.navigate('SignUp')
    }

    const base = () =>{
        database()
        .ref('/')
        .update({
        db
        })  
    }

    return <>
        <View>
            <View style={[styles.px4, styles.py1]}>
                <TouchableOpacity onPress={signOut} style={[styles.btn]}>
                    <Text style={styles.textCenter}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>

                <View style={{flexDirection: 'row', marginTop: 410, marginLeft: 0}}>
                <TextInput  onChangeText={(e) => setDb({ ...db, message: e })} placeholder="Enter Message"   style={[styles.input2, styles.flexcenter,  { flexDirection: 'row', }]}></TextInput>
                <TouchableOpacity onPress={base}  style={styles.btnn}>
                <Text style={styles.fs}>Send</Text>
                </TouchableOpacity>
           </View>
    </>
}

export default Chat;