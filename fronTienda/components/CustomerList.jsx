import { StyleSheet, Text, View , FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import {styles} from '../assets/styles/styles'
import { useForm } from "react-hook-form";

export default function CustomerList() {
  //Estados
    const [data, setData] = useState([]);

  //Metodos
    const getCustomers = async () => {
        const url = `http://127.0.0.1:3000/api/clientes`;
        const response = await axios.get(url);
        setData(response.data);
        console.log(data);
    }
  useEffect(() => {
    getCustomers();
  });



  return (
    <View style={styles.container}>
      <Text style={{padding:10,borderRadius:10,backgroundColor:'powderblue',marginBottom:10}}>Lista de Clientes</Text>
      <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => {
            return(
            <View>
              <TouchableOpacity style={{padding:10,borderRadius:10,backgroundColor:'powderblue',marginBottom:10}}>
                <Text>{item._id} - {item.nombre} - {item.apellidos}</Text>
              </TouchableOpacity>
            </View>
          )}}
        />
    </View>
  );
}

