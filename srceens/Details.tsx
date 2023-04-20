
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage'


const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);



export default function Details({route, navigation}): JSX.Element {
    const [checkCreateStudents, setCheckCreateStudents] = useState(0)
    const {IdClass, NameClass, StudentClass} = route.params
   
    const data = new Array();

    const getData = () => {
      db.transaction((tx) =>{
        tx.executeSql(
            "SELECT Id, Name, Dob FROM Students WHERE IdClass = ?",
            [IdClass],
            (tx, res) =>{
              const len = res.rows.length
            
              
              if (len > 0)
              {
                
                for (var i = 0; i < len; i++)
                {
                  var Class = {
                    Id: res.rows.item(i).Id,
                    Name: res.rows.item(i).Name,
                    Dob: res.rows.item(i).Dob,
                  }

                  data.push(Class)
                  
                  
                }
                
                
              }
            } 
        )
    })
    }

    useEffect(() =>{
      if(checkCreateStudents === 0)
      {
        
        setCheckCreateStudents(1)
        
      }
      
     getData()
      
    }, [])
  return (
    <View style={styles.container} 
      onLayout={ () => getData()}
    >
        <View style ={{flex:1, alignItems: 'center',}}>
          <TouchableOpacity style = {styles.btn}
            onPress={() =>{
              navigation.navigate('AddStudent', {IdClass, NameClass, StudentClass})
            }}
          >
            <Text>New Student</Text>
          </TouchableOpacity>
        </View>
        

        <View style ={{flex:2, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
            <View style = {styles.classDetail }>
                <Text style ={styles.text}>Id: {IdClass}</Text>
                <Text style ={styles.text}>Name: {NameClass}</Text>
                <Text style ={styles.text}>Students {StudentClass}</Text>
            
            </View>

        </View>

        <View style ={styles.content}>

            <FlatList
              data={data}
              renderItem={({item}) => 
              <TouchableOpacity style = {styles.class}

              >
                <Text style ={styles.text}>Id: {item.Id}</Text>
                <Text style ={styles.text}>Name: {item.Name}</Text>
                <Text style ={styles.text}>Dob: {item.Dob}</Text>
              </TouchableOpacity>
            }
            />


          
            
        </View>
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
  
    btn:{
      flex: 1,
      padding: 5,
      backgroundColor: '#69FFB4',
      borderRadius: 20,
      height: 30,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10


    },
    content:{
      flex: 7,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      
     
      
    },
    class:{
      borderWidth: 2,
      backgroundColor: '#96AF9F',
      margin: 10,
      padding: 10,
      borderRadius: 20,
      width: 300
    },
    text:{
      fontSize: 18,
      margin: 1
    },
    classDetail:{
    borderWidth: 2,
      backgroundColor: '#DBF19A',
      margin: 10,
      padding: 10,
      borderRadius: 20,
      width: 300
    }
  });
  
