import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, Pressable, Image  } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateRecipe } from '../controller/recipe.controller';

import NetInfo from '@react-native-community/netinfo';
import Modal from "react-native-modal";

export const isExpensive = () =>{
  return NetInfo.fetch().then(state => {
  return state.details.isConnectionExpensive;
  });
}

export default function CargarReceta({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [isModalVisibleNetwork, setModalVisibleNetwork] = useState(false);
  const [isModalVisibleRecipeExists, setModalVisibleRecipeExists] = useState(false);
  const [isConnectExpensive, setisConnectExpensive] = useState(false);


  isExpensive().then(res => {
    setisConnectExpensive(res)
  })

  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const toggleModalNetwork = () => {
    setModalVisibleNetwork(!isModalVisibleNetwork);
  };
  const toggleModalRecipeExists = () => {
    setModalVisibleRecipeExists(!isModalVisibleRecipeExists);
  };

  const onSubmit = async function(data){
    console.log(await isExpensive(), 'isexpensive');
    // if (await isExpensive()){
    //   setModalVisibleNetwork(!isModalVisibleNetwork);
    // }

    await AsyncStorage.setItem('nombreReceta', data.nombreReceta)
    let verificarReceta = await validateRecipe('')
    if(verificarReceta){
      setModalVisibleRecipeExists(!isModalVisibleRecipeExists);
    }
    else{
      navigation.navigate('RegistroReceta')
    }

  };


  const onSubmitEditar  = async function(data){
    let verificarReceta = await validateRecipe('')
    if(verificarReceta){
      navigation.navigate('EditarReceta', {
        screen: 'EditarReceta',
        params: verificarReceta,
    });
    }
  }

  const onSubmitReemplazar  = async function(data){
    let verificarReceta = await validateRecipe('')
    if(verificarReceta){
      navigation.navigate('EditarReceta', {
        screen: 'EditarReceta',
        params: verificarReceta,
    });
    }
  }
    
  


  return (

    <View style={styles.container}>
        <Text style={styles.olvidoPass}> Ingresar el nombre del plato</Text>
        <Controller
        defaultValue=""
        name="nombreReceta"
        rules={{required:{
            value: true,
            message: 'El Nombre es Obligatorio'
        },
    }}
        control={control}
        render={({ field: { onChange, nombreReceta } }) => (
            <Input
                error={errors.nombreReceta}
                errorText={errors.nombreReceta?.message}
                onChangeText={(nombreReceta) => onChange(nombreReceta)}
                value={nombreReceta}
                placeholder="Nombre"
            />
        )}
        />
      <Button onPress={handleSubmit(onSubmit)} label="Enviar" />

      <View>
      <Modal style={styles.modal}isVisible={isModalVisibleRecipeExists}>
      <View style={styles.modalcontainer} >
          <Image style={styles.imagestyle} source={{
          uri: 'https://i.postimg.cc/43cxCxkD/57-Confused-Quotes-About-The-Ups-and-Downs-of-Life.jpg',
        }}></Image>
          <Text style={styles.ModalText}> Ya tienes un plato con ese nombre</Text>
          </View>
          <View style={[{flexDirection:'row',alignItems:'center'}]}>
            <View style={[{flex:1,flexDirection:'row'}]}>
          <Pressable style={styles.buttonEditar} onPress={onSubmitEditar}>
      <Text style={styles.modalbuttontext}>Editar</Text>
    </Pressable>
    </View>
    <View stlye={[{justifyContent:'space-evenly', marginVertical:10}]}>
    <Pressable style={styles.buttonReemplazar} onPress={onSubmitReemplazar}>
      <Text style={styles.modalbuttontext}>Reemplazar</Text>
    </Pressable>
    </View>
    </View>
    <Pressable style={styles.buttonVolver} onPress={toggleModalRecipeExists}>
      <Text style={styles.buttonVolver}>Volver</Text>
    </Pressable>
      </Modal>
      <Modal style={styles.modal}isVisible={isModalVisibleNetwork}>
      <View style={styles.modalcontainer} >
          <Image style={styles.imagestyle} source={{
          uri: 'https://i.postimg.cc/7h4sZQ0G/images-2.jpg',
        }}></Image>
          <Text style={styles.ModalTextRed}> Usted se encuentra conectado a una red con cargo</Text>
          </View>
          <View style={[{flexDirection:'row',alignItems:'center'}]}>
            <View style={[{flex:1,flexDirection:'row'}]}>
          <Pressable style={styles.buttonUsarRed} onPress={toggleModalNetwork}>
      <Text style={styles.modalbuttontextContinuar}>Continuar</Text>
    </Pressable>
    </View>
    <View stlye={[{justifyContent:'space-evenly', marginVertical:10}]}>
    <Pressable style={styles.buttonEsperarRed} onPress={toggleModalNetwork}>
      <Text style={styles.modalbuttontextRed}>Esperar Red Gratuita</Text>
    </Pressable>
    </View>
    </View>
    <Pressable style={styles.buttonVolverRed} onPress={toggleModalNetwork}>
      <Text style={styles.buttonVolverRed}>Volver</Text>
    </Pressable>
      </Modal>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
    olvidoPass: {textAlign: 'center', color: "#FFFFFF", marginBottom: 40, fontSize: 20},
    modal: {
      height: 10,
      width: 350,
      marginTop: 100,
      marginBottom: 100,
      marginHorizontal: 24,
      alignItems: 'center',
      backgroundColor: '#222121',
      borderRadius: 30
    },
    imagestyle: {
      width: 345,
      height: 250,
      borderRadius: 20
    },
    ModalText: {
      fontSize: 25,
      lineHeight: 20 * 1.4,
      marginTop: 80,
      marginBottom: 0,
      marginHorizontal: 10,
      textAlign: 'center',
      color: '#FFFFFFFF',
      backgroundColor: '#222121',
      fontWeight: "bold",
    },
    ModalTextRed: {
      fontSize: 25,
      lineHeight: 20 * 1.4,
      marginTop: 50,
      marginBottom: 0,
      marginHorizontal: 10,
      textAlign: 'center',
      color: '#FFFFFFFF',
      backgroundColor: '#222121',
      fontWeight: "bold",
    },
    ModalTextm2: {
      fontSize: 25,
      lineHeight: 20 * 1.4,
      marginTop: 30,
      marginBottom: 0,
      marginHorizontal: 10,
      textAlign: 'center',
      color: '#FFFFFFFF',
      backgroundColor: '#222121',
      fontWeight: "bold",
    },
    ModalText2: {
      fontSize: 25,
      lineHeight: 20 * 1.4,
      marginTop: 6,
      marginBottom: 0,
      marginHorizontal: 80,
      textAlign: 'center',
      color: '#FFFFFFFF',
      backgroundColor: '#222121',
      fontWeight: "bold",
    },
    buttonReemplazar: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginHorizontal:20,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#FF0035',
    },
    buttonEditar: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      paddingVertical: 12,
      marginHorizontal: 20,
      paddingHorizontal: 40,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#F7456A',
    },

    buttonEsperarRed: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      marginTop:5,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginHorizontal:20,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#FF0035',
    },
    buttonUsarRed: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      marginTop:5,
      paddingVertical: 12,
      marginHorizontal: 20,
      paddingHorizontal: 40,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#F7456A',
    },
    

    buttonVolver: {
      color:'#6C7072',
      fontSize: 20,
      marginBottom: 10,
    },

    buttonVolverRed: {
      color:'#6C7072',
      fontSize: 15,
      marginBottom: 10,
    },
  
    modalcontainer:{
      marginBottom: 30,
    },
  
    modalbuttontext:{
      color:'#FFFFFF',
      fontWeight: "bold",
      fontSize: 20,
    },

    modalbuttontextRed:{
      color:'#FFFFFF',
      fontWeight: "bold",
      fontSize: 12,
    },
  
    modalbuttontextContinuar:{
      color:'#FFFFFF',
      fontWeight: "bold",
      fontSize: 13,
    },

    modalbuttonback: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 66,
      backgroundColor: '#222121',
    },
  
    modalbuttonbacktext:{
      color:'#6C7072',
      fontSize: 12,
    }
  
  });