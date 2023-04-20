import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage'


const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);


export default function AddStudent({route, navigation}): JSX.Element {

   const {IdClass, NameClass, StudentClass} = route.params

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')

    
    const setStdent = () =>{
        console.log(id, name, dob, IdClass)
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO Students (Id, Name, Dob, IdClass) VALUES(?,?,?,?)",
                [id, name, dob, IdClass],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      Alert.alert(
                        'Success',
                        'You are Add a new Class Successfully',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('Details', {IdClass, NameClass, StudentClass}),
                          },
                        ],
                        { cancelable: false }
                      );
                    } else Alert.alert('Add a new student Failed');
                  }
            )
        })
    }


    
   
  const onPress = () =>{ 
    
    setStdent()
    
  }

  return (
    <View style={styles.container}>
        <Text style = {styles.textLogin}>Add a new student</Text>
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
            <Text style = {styles.text}>Dob</Text>
            <TextInput
                style = {styles.textInput}
                keyboardType="numeric"
                onChangeText={(value) => {
                    setDob(value)
                }}

                value={dob}
                
            />
        </View>

        <TouchableOpacity style = {styles.btn}
          onPress={onPress}
          >
            <Text style = {{fontSize: 18, color: '#fff', padding: 5}}>Add Student</Text>
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
    width: 200,
    backgroundColor: "#247668",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 30
  }
  
});