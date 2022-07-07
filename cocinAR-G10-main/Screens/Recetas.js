import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Button, Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import CounterInput from "react-native-counter-input";
import { Switch } from 'react-native-paper';
import {saveRecipes, calificar} from '../controller/recipe.controller';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';



const onPress = async function() {
  const { postId, params} = route.params;
  const recetass = params.recetass;
  const dato = recetass.idReceta;
  console.log(dato)
  let guardarReceta = await saveRecipes(dato)
  alert('Receta Guardada')
}




class Recetas extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            isSwitchOn: false,
            setIsSwitchOn: false,
            calificacion:1,
            calificacionnueva: 2,
            rating:1,
            cantidad: [],
          };
    }

    // componentDidMount() {
    //   const { idd3, ingredientes} = this.props.route.params;
    //   ingredientes.map((item, index) => {
    //   this.setState({cantidad:item.cantidad});
    //   console.log('entre')
    //   })
    // }

    onPress = async () => {
      const { postId, params} = this.props.route.params;
      console.log('entre')
      console.log(params.recetass.idReceta)
      let guardarReceta = await saveRecipes(params.recetass.idReceta)
      if(guardarReceta.rdo==0){
        alert('Receta Guardada')
      }
      if(guardarReceta.rdo==1){
        alert('Esta receta ya esta guardada')
      }
      if(guardarReceta.rdo==2){
        alert('Ya tienes un maximo de 5 recetas guardadas')
      }
      if(guardarReceta.rdo==3){
        alert('No puedes guardar una receta propia.')
      }
    }

    ratingCompleted = async (rate) => {
      console.log("Rating is: " + rate)
      let count = this.state.rating
      this.setState(this.state.rating = rate)
      console.log(this.state.rating,'thisstaterating')
    
    }



    
    onPressCalificar = async () => {
      const { postId, params} = this.props.route.params;
      const { idd2, usuario} = this.props.route.params;

      var calificacion = {
        idReceta: params.recetass.idReceta,
        creatorNickname: usuario,
        calificacion: this.state.rating
      }
      console.log(calificacion)
      let calificarMetodo = await calificar(calificacion)
      if(calificarMetodo){
        alert('Receta Calificada con Exito')
      }
    }

    onPressCantidad = async (counterPorciones) => {
      const { postId, params} = this.props.route.params;
      const recetass = params.recetass;
      const { idd3, ingredientes} = this.props.route.params;
      let lista = []

      ingredientes.map((item, index) => {
        let newValue = (counterPorciones*item.cantidad)/recetass.porciones // sin redondear
        let newnewValue = Math.floor(newValue) // redondeado
        console.log(newnewValue, 'newvalue')
        lista.push(newnewValue)
        this.setState({cantidad:lista}, () =>
        console.log('setstate'));
       

        })
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
              <TouchableOpacity
         style={styles.saveRecipes}
         onPress={this.onPress}
       >
         <Text style={{color: '#F7456A'}}> GUARDAR </Text>
 </TouchableOpacity>

            <SafeAreaView  style={styles.flatlistStyle}>

                <Text style={styles.textName}>{recetass.nombre}</Text>
                <Text style={styles.textUser}>Por {usuario}</Text>
                <Text style={styles.textRating}>Rating: {recetass.calificacion}</Text>
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
                  onChange={(counterPorciones) => { this.onPressCantidad(counterPorciones)
              
                  }}
                />
                </View></View>
              
                <FlatList
                        data={ingredientes}
                        renderItem={({ item, index }) => (
                          <View style={styles.containerIngredientes}>
                          <Text style={styles.ingredienteText}>{`${item.nombre} en (${item.medida})`}</Text>
                          <View style={styles.containerIngredientCounter}>
                            <Text style={styles.containerIngredienteCantidad}>{this.state.cantidad.length==0? item.cantidad:this.state.cantidad[index]}</Text>
                              </View>
                              </View>
                         

                        )} />
    
            </SafeAreaView>
            <SafeAreaView>
            <Text style={styles.tituloDescription}>Preparacion</Text>
              <FlatList
              data={pasos}
              renderItem={({ item, index }) => (
              <View>
              <Text style={styles.textPasos}>{`Paso ${index+1}: - ${item.descripcion}`}</Text>
                <Image source={{ uri: item.multimedia }} style={styles.imgStylePaso} defaultImage={{uri: 'https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png' }}/>
              </View>
              )}></FlatList>
               <View style={styles.containerRating}>
                    <Text style={styles.textoRating}>Recomendarias esta receta? </Text>
                </View>

                <Rating
                  type='custom'
                  ratingCount={5}
                  imageSize={60}
                  showRating
                  onFinishRating={this.ratingCompleted}
                  style={{backgroundColor:'#222121'}}
                  tintColor='#222121'
                />

                <Button
                  onPress={this.onPressCalificar}
                  title="Calificar"
                  color="#C6A80F"
                />
                
                
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
        marginTop: 50, 
        flexDirection: 'row',
        alignSelf: 'center',

    },
    textoRating:{
        fontSize: 25,
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
      marginLeft: 40,
    },
    containerPorciones:{
      flexDirection: 'row',
      marginBottom: 20,
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
    imgStylePaso:{
      width: 270,
      height: 180,
      borderRadius: 20,
      marginLeft: 60,
  },
  containerIngredienteCantidad:{
    alignItems: 'flex-end',
    backgroundColor: '#F7456A',
    marginBottom: 16,
    marginLeft: 10,
    padding: 9 ,
    borderRadius: 20,
    fontSize: 20,
    paddingHorizontal: 40,
    fontWeight: 'bold'
  }

})

export default Recetas;