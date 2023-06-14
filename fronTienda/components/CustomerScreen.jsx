import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button , TextInput} from 'react-native-paper';
import CustomerList from './CustomerList';
import { styles } from '../assets/styles/styles';
import { Controller, useForm } from 'react-hook-form';
import {MaterialIcons} from '@expo/vector-icons';
import axios from 'axios';


export default function CustomerScreen() {

  const[isError,setIserror] = useState(false);
  const [message,setMessage] = useState('');
  const [idsearch,setIdsearch] = useState('');

  const { control, handleSubmit, formState: { errors }, reset, setValue} = useForm({
    defaultValues: {
      nombre: '',
      apellidos: ''
    }
  });
  const onSave = async(data) => {
    const {nombre, apellidos} = data;
    try {
      const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      setMessage("Cliente agregado correctamente");
      console.log(nombre, apellidos);
      setTimeout(() => {
        setMessage('')
        reset();
      }, 2000)
    } catch (error) {
      console.log(error)
    }
    finally{
      //setLoading(false);
    };
  }

  const onUpdate = async(data) => {
    const {nombre, apellidos} = data;
    try {
      const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idsearch}`, {
        nombre:data.nombre,
        apellidos:data.apellidos,
      });
      setMessage("Cliente actualizado correctamente");
      console.log(nombre, apellidos);
      setTimeout(() => {
        setMessage('')
        reset();
      }, 2000)
      reset();
      setIdsearch('');
    } catch (error) {
      console.log(error)
    }
    finally{
      //setLoading(false);
    };
  }

  const onDelete = async(data) =>{
    if(confirm(`Esta seguro de eliminar el cliente:${data.nombre} ${data.apellidos}?`)){
      const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${idsearch}`);
      setIserror(false);
        setMessage('Cliente eliminado correctamente.');
        setTimeout(()=>{
          setMessage('');
          reset();
          setIdsearch('');
        },2000)
      }
  }

  const onSearch = async(idsearch) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${idsearch}`);
      console.log(response.data);
      if(!response.data.error) {
        setValue("nombre",response.data.nombre);
        setValue("apellidos",response.data.apellidos);
        setIserror(false);
        setMessage('');
      }else{
        setIserror(true);
        setMessage('El ID del cliente no existe.');
        setTimeout(()=>{
          setMessage('')
        },3000)
        reset();
        setIdsearch('');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    finally{
      //setLoading(false);
    }
  }



  return (

    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:25,marginBottom:20}}>Actualización de Clientes</Text>
      <TextInput
        label='ID del Cliente a Buscar'
        mode='outlined'
        left={<TextInput.Icon icon='account'/>}
        onChangeText={(idsearch) => setIdsearch(idsearch)}
        value={idsearch}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Nombres'
            mode='outlined'
            left={<TextInput.Icon icon='account'  />}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="nombre"
      />
      {errors.nombre && <Text style={{color:"red"}}>El nombre es obligatorio.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label='Apellidos'
            mode='outlined'
            left={<TextInput.Icon icon='account'/>}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="apellidos"
      />
      {errors.apellidos && <Text style={{color:"red"}}>Los apellidos son obligatorios.</Text>}

      <Text style={{color:"white", backgroundColor: isError? 'red' : 'green',fontWeight:'bold',fontSize:20}}>{message}</Text>
      <View style={{flexDirection:'row',marginTop:20}}>
        <Button
        icon="view-list"
        mode="contained"
        onPress={handleSubmit(onSave)}
        style={{backgroundColor:'green'}}>
          Agregar
        </Button>

        <Button
        icon="view-list"
        mode="contained"
        style={{backgroundColor:'black', marginLeft:10}}
        onPress={() => onSearch(idsearch)}
        >
          Buscar
        </Button>
      </View>

      <View style={{flexDirection:'row',marginTop:20}}>
        <Button
        icon="view-list"
        mode="contained"
        style={{backgroundColor:'yellowgreen'}}
        onPress={handleSubmit(onUpdate)}
        >
          Actualizar
        </Button>

        <Button
        icon="view-list"
        mode="contained"
        style={{backgroundColor:'red', marginLeft:10}}
        onPress={handleSubmit(onDelete)}
        >
          Eliminar
        </Button>
      </View>

    </View>

  );
}