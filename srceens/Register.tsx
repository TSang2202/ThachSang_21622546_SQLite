import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage'


const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);


export default function Register({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [registered, setRegistered] = useState(0)

    const createTable = () =>{
        db.transaction((tx) =>{
            tx.executeSql(
                "CREATE TABLE User (Username TEXT NOT NULL, Password TEXT NOT NULL)", 
                
            )
        })
    }

    const createClasses = () =>
    {
      db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE Classes (Id TEXT PRIMARY KEY, Name TEXT NOT NULL, Students INTEGER NOT NULL)", 
        )
    })
  }
    const createStudents = () =>
    {
      db.transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE Students" +
            "(Id TEXT PRIMARY KEY, Name TEXT NOT NULL, Dob INTEGER NOT NULL, IdClass TEXT NOT NULL)" 
             
        )
    })
    
    }

    const SetUser = () =>{
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO User (Username, Password) VALUES(?,?)",
                [username, password],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'You are Registered Successfully',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('Login'),
                          },
                        ],
                        { cancelable: false }
                      );
                    } else Alert.alert('Registration Failed');
                  }
            )
        })
    }

    
   
  const onPress = () =>{ 

    if (registered === 0){
        createTable();
        createClasses()
        createStudents()

        SetUser();
       
        setRegistered(1);
    }

    
  }

  return (
    <View style={styles.container}>
        <Text style = {styles.textLogin}>REGISTER</Text>
        <View>
            <Text style = {styles.text}>Username</Text>
            <TextInput
                style = {styles.textInput}
                onChangeText={ value => setUsername(value)}
                value ={username}
            />
        </View>

        <View>
            <Text style = {styles.text}>Password</Text>
            <TextInput
                style = {styles.textInput}
                onChangeText={(value) => {
                    setPassword(value)
                }}

                value={password}
                
            />
        </View>

        <TouchableOpacity style = {styles.btn}
          onPress={onPress}
          >
            <Text style = {{fontSize: 18, color: '#fff', padding: 5}}>REGISTER</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLogin:{
    fontSize: 30,
    margin: 10,

  },
  textInput:{
    fontSize: 20,
    width: 300, 
    height: 40,
    backgroundColor: "#ccc",
    marginBottom: 5,
    padding: 10
  },
  text:{
    fontSize: 20,
    margin: 5
  },
  btn: {
    width: 100,
    backgroundColor: "#247668",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 30
  }
  
})