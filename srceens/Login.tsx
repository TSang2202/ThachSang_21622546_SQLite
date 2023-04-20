import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);

export default function Login({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getUser = () =>{
      db.transaction((tx) =>{
       
        tx.executeSql(
          "SELECT * FROM User;"
          , []
          ,(tx, results) =>{
            console.log('sang');
            var len = results.rows.length;
            if(len > 0){
              const usernameCheck = results.rows.item(0).Username
              const passwordCheck = results.rows.item(0).Password

              if (username === usernameCheck && password === passwordCheck){
                navigation.navigate('Classes')
              }
            }
          }
        )
      })
    }

  const onPress = () =>{ 
    
    getUser();
  }

  return (
    <View style={styles.container}>
        <Text style = {styles.textLogin}>LOGIN</Text>
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
            <Text style = {{fontSize: 18, color: '#fff', padding: 5}}>LOGIN</Text>
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
