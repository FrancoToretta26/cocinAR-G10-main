import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import CounterInput from "react-native-counter-input";


class Recetas extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
          };
    }

    render(){
        const { postId, params} = this.props.route.params;
        const { idd, pasos} = this.props.route.params;
        const { idd2, usuario} = this.props.route.params;
        const { idd3, ingredientes} = this.props.route.params;
        const { idd4, tags} = this.props.route.params;

        const recetass = params.recetass;
        const pasoss = params.pasos
        console.log(params.recetass)
        console.log(pasos)
        console.log(usuario)
        console.log(ingredientes)
        console.log(tags)
        return(
            <View style={styles.container}>
              <ScrollView>
            <SafeAreaView  style={styles.flatlistStyle}>

                <Text style={styles.textName}>{recetass.nombre}</Text>
                <Text style={styles.textUser}>Por {usuario}</Text>
                <Text style={styles.textRating}>Rating: {recetass.rating}</Text>
                <Image source={{ uri: recetass.foto }} style={styles.imgStyle}></Image>
                <Text style={styles.tituloDescription}>Descripcion</Text>
                <View style={styles.containerDescription}>
                <Text style={styles.textDescription}>{recetass.descripcion}</Text></View>
            </SafeAreaView>
            <SafeAreaView>
            <Text style={styles.tituloDescription}>Ingredientes</Text>
            <View style={styles.containerPorciones}>
              <Text style={styles.textoPorciones}>{recetass.porciones} porciones</Text>
              <View style={styles.containerIngredientCounterPorciones}>
                <CounterInput
                  width={150}
                  style={styles.counter}
                  backgroundColor='#F7456A'
                  initial={recetass.porciones}
                  increaseButtonBackgroundColor='black'
                  decreaseButtonBackgroundColor='black'
                  horizontal
                  onChange={(counter) => {
                  console.log("onChange Counter:", counter);
                  }}
                />
                </View></View>
              
                <FlatList
                        data={ingredientes}
                        renderItem={({ item }) => (
                          <View style={styles.containerIngredientes}>
                          <Text style={styles.ingredienteText}>{item.nombre}</Text>
                          <View style={styles.containerIngredientCounter}>
                              <CounterInput
                                width={150}
                                style={styles.counter}
                                backgroundColor='#F7456A'
                                initial={item.cantidad}
                                increaseButtonBackgroundColor='black'
                                decreaseButtonBackgroundColor='black'
                                horizontal
                                onChange={(counter) => {
                                console.log("onChange Counter:", counter);
                                }}
                              />
                              </View>
                              </View>
                         

                        )} />
    
            </SafeAreaView>
            <SafeAreaView>
            <Text style={styles.tituloDescription}>Preparacion</Text>
              <FlatList
              data={pasos}
              renderItem={({ item }) => (
              <View>
              <Text style={styles.textPasos}>{`Paso - ${item.descripcion}`}</Text></View>
              )}></FlatList>
               <View style={styles.containerRating}>
                    <Text style={styles.textoRating}>Recomendarias esta receta? </Text>
                    <Icon
                    style={styles.iconRating}
                    name='done'
                    color='green' />
                    <Icon
                    style={styles.iconRating}
                    name='close'
                    color='red' />
                </View>
                
                
                <SafeAreaView style={styles.containerTipos}>
                    <Text style={styles.tituloDescription}>Tipos</Text>
                      <Text style={styles.tagsTipos}>{tags}</Text>
                </SafeAreaView> 
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

})

export default Recetas;