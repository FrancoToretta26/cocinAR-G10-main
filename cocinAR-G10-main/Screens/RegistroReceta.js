import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Image,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import CounterInput from 'react-native-counter-input';

import * as ImagePicker from 'expo-image-picker';

import {Picker} from '@react-native-picker/picker';

import { AntDesign } from '@expo/vector-icons';

import Button2 from '../Components/Button';
import { submitRecipe } from '../controller/recipe.controller';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default class RegistroReceta extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            
            image: null,
            porciones:'1',
            descripcion:"",

            ingredientes: [{
                ingrediente: '',
                cantidad: ''
            }],

            pasos: [{
                idPaso:"",
                nombre:"",
                imagen:null,
                descripcion:""
            }],

            choosenIndex: 0,
            categoria: null,
            categorias: [
                {label: 'Apple', value: 'apple'},
                {label: 'Banana', value: 'banana'}
              ]
        };
    }

  
    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsEditing:true
        });
        if (!result.cancelled) {
            console.log(result.uri);
          this.setState({ image: result.uri });
        }
      };

      onPress = async () => {
        var nombre = "Pollo al horno"
        const idUsuario = await AsyncStorage.getItem('idUsuario')
        const idUser = parseInt(idUsuario)
        var receta = []
        var recetaInfo = {
            nombre : nombre,
            descripcion : this.state.descripcion,
            foto : this.state.foto,
            porciones : this.state.porciones,
            cantidadPersonas : 3,
            tag : this.state.choosenIndex,
            idUsuario: idUser,
        }
        receta.push(recetaInfo)

        var data = {
            //nombre: 
            receta: receta,
            ingredientes : this.state.ingredientes,
            pasos : this.state.pasos,
        }
        console.log(data, 'data')

        let enviarReceta = await submitRecipe(data)
        // if(enviarReceta){
        //   alert('Receta Guardada')
        // }
      }

    render() {
        const { ingredientes } = this.state
        const { pasos } = this.state
        const {image} = this.state
        const {porciones} = this.state


        return (
            <SafeAreaView style={ styles.container }>
                <ScrollView>
                <View style={styles.flatlistStyle}>

                <StatusBar hidden={true} />
                        {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
                        <Button title="Subir imagen" 
                                onPress={this.pickImage}
                                color={"#F7456A"}
                                />
                                
                    <StatusBar style="auto" />

                <View style={styles.inputView}>
                    <TextInput placeholder='Descripción' placeholderTextColor={"#808080"}
                        style={styles.input}
                        value={this.state.descripcion}
                        onChangeText={text => {
                            this.setState({descripcion: text})
                        }} 
                        />

                </View>


                <View style={styles.counterContainer}>

                    <Text style={styles.textCounter}>Porciones</Text>

                    <CounterInput
                        width={150}
                        style={styles.counter}
                        backgroundColor='#F7456A'
                        initial={1}
                        increaseButtonBackgroundColor='black'
                        decreaseButtonBackgroundColor='black'
                        horizontal
                        onChange={(counter) => {
                        this.setState({porciones: counter})
                        }}
                    />

                </View>

                <Text style={styles.ingredienteText}>Ingredientes</Text>

                    {
                        ingredientes.map((item, index) => {

                            return (

                                <View  style={styles.ingredientesContainer}>
                                    <View style={styles.ingredienteContainer}>
                                        <TextInput placeholder='Ingredientes' placeholderTextColor={"#808080"}
                                            value={item.ingrediente}
                                            style={styles.ingrediente}
                                            onChangeText={text => {
                                                this.setState({ ingredientes: ingredientes.map((c, innerIndex) => innerIndex === index ? { ...c, ingrediente: text } : c) })
                                            }} />
                                        <TextInput placeholder='Cantidad' placeholderTextColor={"#808080"}
                                            value={item.cantidad}
                                            style={styles.cantidad}
                                            onChangeText={text => {
                                                this.setState({ ingredientes: ingredientes.map((c, innerIndex) => innerIndex === index ? { ...c, cantidad: text } : c) })
                                            }} />

                                        <TouchableOpacity style={styles.Removebutton}>
                                            <AntDesign name="minuscircle" size={24} color="#F7456A" 
                                            onPress={() => {
                                                const filterList = ingredientes.filter((item, inner) => inner != index)
                                                this.setState({ ingredientes: filterList })
                                            }}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                   
                                </View>
                            )
                        })
                    }


                    <View style={styles.Addcontainer}>
                        <TouchableOpacity style={styles.Addbutton}>
                            <AntDesign name="pluscircle" size={24} color="#F7456A" />
                            <Text style={styles.Addtext}
                            onPress={() => {
                                this.setState({
                                    ingredientes: [...ingredientes, {
                                      ingrediente: '',
                                        cantidad: ''
                                    }]
                                })
                            }} >Ingrediente</Text>
                        </TouchableOpacity>
                    </View>

                   
                    <Text style={styles.ingredienteText}>Pasos</Text>
                    {
                        pasos.map((item, index) => {
                            return (                            

                                <View style={styles.pasosInside}>
                                    <View >
                                        <View style={styles.pasosNombreView}>
                                            <TextInput placeholder='Nombre' placeholderTextColor={"#808080"}
                                                value={item.nombre}
                                                style={ styles.pasosNombre }
                                                onChangeText={text => {
                                                    this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, nombre: text, idPaso: index+1 } : c)  })
                                                }} />
                                         </View>

                                         <StatusBar hidden={true} />
                                            {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
                                            <Button title="Subir imagen" 
                                            color={"#F7456A"}
                                                onPress={ async () => {
                                                           let result = await ImagePicker.launchImageLibraryAsync({
                                                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                                            quality: 1,
                                                            allowsEditing:true
                                                            });
                                                            if (!result.cancelled) {
                                                                this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, imagen: result.uri } : c)  });

                                                        }
                                                        console.log(pasos);}}/>

                                        <StatusBar style="auto" />

                                        <View style={styles.pasosDescripcionView}>
                                            <TextInput placeholder='Descripción' placeholderTextColor={"#808080"}
                                                value={item.descripcion}
                                                style={styles.pasosDescripcion}
                                                onChangeText={text => {
                                                    this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, descripcion: text } : c) })
                                                }} />
                                        </View>

                                    </View>

                                    <TouchableOpacity style={styles.Removebutton}>
                                            <AntDesign name="minuscircle" size={24} color="#F7456A" 
                                            onPress={() => {
                                                const filterList = pasos.filter((item, inner) => inner != index)
                                                this.setState({ pasos: filterList })
                                            }}
                                            />
                                        </TouchableOpacity>

                                </View>
                            )
                        })
                    }

                    <View style={styles.Addcontainer}>
                        <TouchableOpacity style={styles.Addbutton}>
                            <AntDesign name="pluscircle" size={24} color="#F7456A" />
                            <Text style={styles.Addtext}
                            onPress={() => {
                                this.setState({
                                  pasos: [...pasos, {
                                      nombre: '',
                                      imagen: null,
                                      descripcion: ''
                                    }]
                                })
                            }} >Paso</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                <Text style={styles.ingredienteText}>Agregar etiquetas</Text>

                <Picker style={styles.pickerStyle}
                        selectedValue={this.state.categoria}
                        onValueChange={(itemValue, itemPosition) =>
                            this.setState({categoria: itemValue, choosenIndex: itemPosition})}
                            >
                            <Picker.Item label="Pasta" value="Pasta" />
                            <Picker.Item label="Parrilla" value="Parrilla" />
                            <Picker.Item label="Pizza" value="Pizza" />
                            <Picker.Item label="Tacos" value="Tacos" />
                            <Picker.Item label="Sushi" value="Sushi" />
                            <Picker.Item label="China" value="China" />
                            <Picker.Item label="Arabe" value="Arabe" />
                            <Picker.Item label="Argenta" value="Argenta" />
                            <Picker.Item label="Peruana" value="Peruana" />
                            <Picker.Item label="Vegana" value="Vegana" />
                </Picker>

            </View>
                    

                </View>
                <Button2 onPress={this.onPress} label="Enviar Receta" />
                </ScrollView>
                
            </SafeAreaView>
        )
    }
}
const backgroundColor= "#222122"
const fontColorGrey= "#808080"
const fontColorWhite= "#F1F1F1"
const red="#F7456A"

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },

    flatlistStyle:{
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: 8,
        borderRadius: 8
    },

    inputView:{
        height: 130,
        width: 350,
        borderStyle: "solid",
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: fontColorGrey,
    },

    input:{
        padding:10,
        color:fontColorWhite,
    },

    counterContainer:{
        display: "flex",
        flexDirection:'row',
        justifyContent: "space-evenly",
        alignItems: "baseline",
        padding: 10,
        
    },

    textCounter:{
        paddingRight:80,
        color: fontColorWhite,
        fontWeight: "bold",
        fontSize: 18,
    },

    ingredientesContainer:{
        display: "flex",
        justifyContent: "space-evenly",
    },

    ingredienteContainer:{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection:'row',
        color: fontColorGrey,
        padding: 10,
        alignItems: "baseline",
    },

    ingredienteText:{
        alignSelf:"flex-start",
        left:32,
        color: fontColorWhite,
        fontWeight: "bold",
        fontSize: 18,
    },

    ingrediente:{
        flexDirection:'row',
        color: fontColorWhite,
        borderWidth: 1, 
        borderBottomColor:red,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        marginRight:30,
        paddingRight:50,
        fontSize: 16,
    },

    cantidad:{
        flexDirection:'row',
        color: fontColorWhite,
        fontSize: 16,
        borderWidth: 1, 
        borderBottomColor:red,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
    },

        Addcontainer: {
          flex: 1,
          justifyContent: 'center',
          padding: 8,
        },

        Addbutton: {
          height: 40,
          borderRadius: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },

        Removebutton: {
            height: 40,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft:30
          },

        Addtext: {
          fontWeight: 'bold',
          fontSize: 16,
          color: red,
          marginLeft: 10,
        },

    pasosInside:{
        flexDirection: 'row',
        justifyContent:"space-evenly",
        paddingTop:30,
        paddingBottom:20


    },
    
    pasosNombreView:{
        height: 40,
        width: 300,
        borderStyle: "solid",
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor:fontColorGrey,
    },

    pasosNombre:{
        padding: 10
    },

    pasosDescripcionView:{
        height: 130,
        width: 300,
        borderStyle: "solid",
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor:fontColorGrey,
    },
    pasosDescripcion:{
        padding:10
    },  
  });