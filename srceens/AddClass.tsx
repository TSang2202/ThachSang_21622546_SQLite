import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage'


const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);


export default function AddClass({navigation}) {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [student, setStudents] = useState('')

    
    const setClass = () =>{
        console.log('onpress')
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO Classes (Id, Name, Students) VALUES(?,?,?)",
                [id, name, student],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'You are Add a new Class Successfully',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('Classes'),
                          },
                        ],
                        { cancelable: false }
                      );
                    } else Alert.alert('Add a new class Failed');
                  }
            )
        })
    }
    
  const onPress = () =>{ 
    
    setClass()
    
  }

  return (
    <View style={styles.container}>
        <Text style = {styles.textLogin}>Add a new class</Text>
        <View>
            <Text style = {styles.text}>Id</Text>
            <TextInput
                style = {styles.textInput}
                onChangeText={ value => setId(value)}
                value ={id}
            />
        </View>

        <View>
            <Text style = {styles.text}>Name</Text>
            <TextInput
                style = {styles.textInput}
                onChangeText={(value) => {
                    setName(value)
                }}

                value={name}
                
            />
        </View>

        <View>
            <Text style = {styles.text}>Students</Text>
            <TextInput
                style = {styles.textInput}
                keyboardType="numeric"
                onChangeText={(value) => {
                    setStudents(value)
                }}

                value={student}
                
            />
        </View>

        <TouchableOpacity style = {styles.btn}
          onPress={onPress}
          >
            <Text style = {{fontSize: 18, color: '#fff', padding: 5}}>Add Class</Text>
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
  
});