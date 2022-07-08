import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import CounterInput from "react-native-counter-input";
import { Switch } from 'react-native-paper';
import {saveRecipes} from '../controller/recipe.controller';


const onPress = async function() {
  const { postId, params} = route.params;
  const recetass = params.recetass;
  const dato = recetass.idReceta;
  let guardarReceta = await saveRecipes(dato)
  alert('Receta Guardada')
}


class RecetaGuardada extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            isSwitchOn: false,
            setIsSwitchOn: false,
          };
    }




    render(){
        const { postId, params} = this.props.route.params;
        const { idd, pasos} = this.props.route.params;
        const { idd2, usuario} = this.props.route.params;
        const { idd3, ingredientes} = this.props.route.params;
        const { idd4, tags} = this.props.route.params;
        const { idd5, calificacion} = this.props.route.params;

        const {setIsSwitchOn} = this.props

        const recetass = params.recetass;
        const pasoss = params.pasos
        return(
            <View style={styles.container}>
              <ScrollView>
            <SafeAreaView  style={styles.flatlistStyle}>

                <Text style={styles.textName}>{recetass.nombre}</Text>
                <Text style={styles.textUser}>Por {usuario}</Text>
                <Image source={{ uri: recetass.foto }} style={styles.imgStyle}></Image>
                <Text style={styles.tituloDescription}>Descripcion</Text>
                <View style={styles.containerDescription}>
                <Text style={styles.textDescription}>{recetass.descripcion}</Text></View>
            </SafeAreaView>
            </ScrollView>
            </View>
        )
    }

  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#222121'
    },
    flatlistStyle:{
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#222121',
        marginBottom: 16,
        padding: 8,
        borderRadius: 8
    },
    imgStyle:{
        width: 270,
        height: 180,
        borderRadius: 20
    },
    btnStyle:{
        backgroundColor: '#037272',
        padding: 10,
        borderRadius: 8,
    },
    textName:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textUser:{
        color: '#F7456A',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
    },    
    textRating:{
        color: 'white',
        fontSize: 13,
        fontWeight: 'normal',
        marginBottom: 20,
    },    
    textFecha:{
        color: 'white',
        fontSize: 13,
        fontWeight: 'normal',
        marginTop: 10,
    },  
    containerDescription:{
        alignItems: 'center',
        backgroundColor: '#F7456A',
        marginBottom: 10,
        padding: 15,
        borderRadius: 20
    }, 
    textDescription:{
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 10,
    },
    tituloDescription:{
        fontSize: 22,
        color: 'white',
        marginRight: 250,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        padding: 3
    },
    textPasos:{
        alignItems: 'center',
        backgroundColor: '#F7456A',
        marginBottom: 10,
        padding: 15,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'normal',
        marginTop: 10,
        fontWeight: 'bold',
        backgroundColor: '#F7456A',
    },
    containerTipos:{
    },
    tagsTipos:{
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 20,
        alignSelf: "flex-start",
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 20,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerRating:{
        flexDirection: 'row',

    },
    textoRating:{
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',

    },
    iconRating:{

    },
    content:{
        fontSize: 30
    },
    avatar:{
        width: 100,
    },
    containerIngredientes:{
      flexDirection:'row',
    },
    counter:{
      height: 50,
      borderWidth: 4,
      borderColor: "#20232a",
    },
    ingredienteText:{
      fontSize:20,
      color: 'white',
      padding: 15,
      fontWeight: 'bold',
    },
    containerIngredientCounter:{
      marginLeft: 150,
    },
    containerPorciones:{
      flexDirection: 'row',
    },
    textoPorciones:{
      padding: 15,
      fontSize:20,
      color: '#F7456A',
      fontWeight:'bold'
    },
    containerIngredientCounterPorciones:{
      marginLeft: 90,
    },
    saveRecipes: {
      alignItems: 'flex-end',
      padding: 10
    },

})

export default RecetaGuardada;