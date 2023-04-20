
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage'


const db = openDatabase({ name: 'Database.db' },
   () =>{

   }
);


export default function Classes({navigation}): JSX.Element {
    const [checkCreateClass, setCheckCreateClass] = useState(0)
    const [lenData, setLenData] = useState(0)

    const data = new Array();

    

    const getData = () => {
      db.transaction((tx) =>{
        tx.executeSql(
            "SELECT Id, Name, Students FROM Classes",
            [],
            (tx, res) =>{
              const len = res.rows.length
             
              
              if (len > 0)
              {
                
                for (var i = 0; i < len; i++)
                {
                  var Class = {
                    Id: res.rows.item(i).Id,
                    Name: res.rows.item(i).Name,
                    Students: res.rows.item(i).Students,
                  }

                  data.push(Class)
                  
                  
                }
                
                setLenData(len)
              }
            } 
        )
    })
    }

    useEffect(() =>{
       
      
      getData()

     
    }, [])

    
  return (
    <View style={styles.container}
      
    >
        <View style ={{flex:1, alignItems: 'center',}}>
          <TouchableOpacity style = {styles.btn}
            onPress={() =>{
              navigation.navigate('AddClass')
            }}
          >
            <Text>New Class</Text>
          </TouchableOpacity>
        </View>
        

        <View style ={styles.content}>

            <FlatList
              data={data}
              renderItem={({item}) => 
              <TouchableOpacity style = {styles.class}
                  onPress={() => 
                    {

                      const IdClass = item.Id
                      const NameClass = item.Name
                      const StudentClass = item.Students
                      navigation.navigate('Details', {IdClass, NameClass, StudentClass})

                    }}
              >
                <Text style ={styles.text}>Id: {item.Id}</Text>
                <Text style ={styles.text}>Name: {item.Name}</Text>
                <Text style ={styles.text}>Students {item.Students}</Text>
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
      flex: 10,
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
    }
  });
  
