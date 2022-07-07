import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, Text, View, Pressable, Image  } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import Modal from "react-native-modal";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { submitRecipe } from '../controller/recipe.controller';


export const isExpensive = () =>{
    return NetInfo.fetch().then(state => {
    return state.details.isConnectionExpensive;
    });
  }

export default function ValidarConexion({ navigation, route }) {
    const [isModalVisibleNetwork, setModalVisibleNetwork] = useState(false);
    const [isConnectExpensive, setisConnectExpensive] = useState(false);
    const [isModalVisibleDone, setModalVisibleDone] = useState(false);


    useEffect( async () => {
        if (await isExpensive()==false){
            const { postId, users } = route.params;
            console.log(users, 'users')
            let enviarReceta = await submitRecipe(users)
            if(enviarReceta.rdo==0){
                console.log('entre al if')
                alert('La receta se ha subido con exito')
                navigation.navigate('Inicio')
            }
            else{
                alert('La subida de la receta ha fallado')
                navigation.navigate('Inicio')
            }     
    }
    },[])

    isExpensive().then(res => {
        setisConnectExpensive(res)
      })

      const toggleModalNetworkVolver = () => {
        navigation.navigate('Inicio')
      };

      const toggleModalNetwork = async () => {
        const { postId, users } = route.params;
        let enviarReceta = await submitRecipe(users)
        if(enviarReceta.rdo==0){
            console.log('entre al if')
            alert('La receta se ha subido con exito')
            navigation.navigate('Inicio')
      };
    }

    return(
        <View style={styles.container}>
            <View>
            <View style={styles.modalcontainer}>
                        <Image style={styles.imagestyle} source={{
                            uri: 'https://i.postimg.cc/7h4sZQ0G/images-2.jpg',
                        }}></Image>
                        <Text style={styles.ModalTextRed}> Usted se encuentra conectado a una red con cargo</Text>
                    </View>
                    <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={[{ flex: 1, flexDirection: 'row' }]}>
                            <Pressable style={styles.buttonUsarRed} onPress={toggleModalNetwork}>
                                <Text style={styles.modalbuttontextContinuar}>Continuar</Text>
                            </Pressable>
                        </View>
                        <View stlye={[{ justifyContent: 'space-evenly', marginVertical: 10 }]}>
                            <Pressable style={styles.buttonEsperarRed} onPress={toggleModalNetworkVolver}>
                                <Text style={styles.modalbuttontextRed}>Esperar Red Gratuita</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Pressable style={styles.buttonVolverRed} onPress={toggleModalNetworkVolver}>
                        <Text style={styles.buttonVolverRed}>Volver</Text>
                    </Pressable>

            </View>
            
            </View>
            
    )





}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#222122',
        height: 1000
    },
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
      borderRadius: 20,
      marginLeft: 30,
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
      marginLeft: 90,
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