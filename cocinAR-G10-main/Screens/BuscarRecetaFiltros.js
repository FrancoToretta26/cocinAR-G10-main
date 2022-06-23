import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Switch, Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Button from '../Components/Button';

import { useForm, Controller} from 'react-hook-form';

import { Icon } from 'react-native-elements'
import { Searchbar } from "react-native-paper";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../utils/animations';
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import { getRecipes } from "../controller/recipe.controller";
import Input from '../Components/Input'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);



const tipos = [
    {idTipo: 1, image:"https://thumbs.dreamstime.com/b/pastas-de-penne-rigate-202772.jpg", tipo_txt:"Pasta"},
    {idTipo: 2, image:"https://saboryestilo.com.mx/wp-content/uploads/2020/01/tips-para-hacer-la-mejor-carne-asada-1200x675.jpg", tipo_txt:"Parrilla"},
    {idTipo: 3, image:"https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=", tipo_txt:"Pizza"},
    {idTipo: 4,image:"https://img.freepik.com/foto-gratis/tacos-mexicanos-carne-res-salsa-tomate-salsa_2829-14221.jpg?w=2000", tipo_txt:"Tacos"},
    {idTipo: 5,image:"https://t1.rg.ltmcdn.com/es/posts/1/3/0/hacer_sushi_paso_a_paso_16031_600_square.jpg", tipo_txt:"Sushi"},
    {idTipo: 6, image:"https://assets.unileversolutions.com/recipes-v2/210886.jpg", tipo_txt:"China"},
    {idTipo: 7, image:"https://ep01.epimg.net/elcomidista/imagenes/2019/05/02/articulo/1556797977_794638_1556802052_noticia_normal.jpg", tipo_txt:'Arabe'},
    {idTipo: 8, image:"https://cdn.inteligenciaviajera.com/wp-content/uploads/2019/11/comida-tipica-argentina.jpg", tipo_txt:'Argenta'},
    {idTipo: 9, image:"https://bolcereales.com.ar/wp-content/uploads/2021/08/cocina-peruana.jpg", tipo_txt:'Peruana'},
    {idTipo: 10, image:"https://www.runtastic.com/blog/wp-content/uploads/2015/12/thumbnail_1200x800-1-1024x683.jpg", tipo_txt:'Vegana'},


];

const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;

const ANCHO_CONTENEDOR = 65 ;
const ESPACIO_CONTENEDOR = width * 0.4;
const ESPACIO = 1;


class BuscarRecetaFiltros extends Component{
    state = {
        index: 0
      }
    constructor(props){
        super(props);
        this._renderItem = this._renderItem.bind(this)
        this.state = { 
            usuario: "",
            ingredientList : [],
            notIngredientList : [],
            isLoading: false,
            dummyData:[
                {id:1,name: 'tuco', backgroundColor:'white'},
                {id:2,name: 'fideos', backgroundColor:'white'},
                {id:3,name: 'palta', backgroundColor:'white'},
            ],   
        }
    }

componentDidMount() {
        let arr = this.state.dummyData.map((item, index)=>{
            return {...item}
            
        })
        this.setState({dummyData : arr});
      }

      _renderItem = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.url }}></Image>
          </View>
        );
    
      }

      



selectionHandler=(ind)=>{
    
    const { postId, ingredientes } = this.props.route.params;
    var {ingredientList} = this.state
    var {notIngredientList} = this.state
    let arr = ingredientes.map((item, index)=>{
        if(ind == index){
            if(ind == index && item.backgroundColor=='red'){
                item.backgroundColor = 'white'
                var ubicacion = notIngredientList.indexOf(item)
                notIngredientList.splice(ubicacion,1)
            }
            else if(ind == index && item.backgroundColor=='white'){
                item.backgroundColor = 'green'
                ingredientList.push(item)
                console.log(ingredientList);
            }

            else if(ind == index && item.backgroundColor=='green'){
                item.backgroundColor = 'red'
                notIngredientList.push(item)
                var ubicacion = ingredientList.indexOf(item)
                ingredientList.splice(ubicacion,1)
            }
            console.log(notIngredientList);
        }
        return{...item}
    })

    this.setState({dummyData: arr})
  }

  onPress = async () => {
    console.log(this.state.ingredientList,'ingredient list dentro del onpress')
    console.log(this.state.notIngredientList,'notingredient list dentro del onpress')

    var data = {
        ingredientes : this.state.ingredientList,
        notIngredientes : this.state.notIngredientList,
        user: this.state.usuario
    }
    let filtrarRecetas = await getRecipes(data);
    if(filtrarRecetas){
        this.props.navigation.navigate('SearchScreen', {
            postId: 3006,
            users: filtrarRecetas})
        }
  }

  handleUser = (text) => {
    this.setState({ usuario: text })
 }




  render() {
    const {isLoading, dummyData } = this.state
    const { postId, ingredientes } = this.props.route.params;
    console.log(ingredientes,'ingredientes');

    return(
        

    <View style={{flex:1, backgroundColor:'black'}}>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Buscar por usuario"
               placeholderTextColor = "#F7456A"
               autoCapitalize = "none"
               onChangeText = {this.handleUser}/>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20, marginLeft: 20,}}>Tipos</Text>

        <StatusBar barStyle='dark-content'></StatusBar>
        <SafeAreaView style={{backgroundColor:'black', marginTop: 20,}}>
            <StatusBar hidden/>
            <FlatList data={tipos}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({item, index}) => {
                return(
                    <View style={{width:ANCHO_CONTENEDOR}}>
                        <TouchableOpacity onPress={async () => {
                            var data = {
                                tipo: item.tipo_txt
                            }
                            let filtrarTipo = await getRecipes(data);
                            if(filtrarTipo){
                                this.props.navigation.navigate('SearchScreen', {
                                    postId: 3006,
                                    users: filtrarTipo})
                                }

                        }}>
                        <View style={{marginHorizontal: ESPACIO, padding: ESPACIO, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', backgroundColor:'black'}}
                        >
                            <Image source={{ uri:item.image}} style={styles.posterImage}></Image>
                        </View>
                        <Text style={{color:'white', alignSelf: 'center', marginBottom: 25, fontSize: 15, fontWeight:'bold'}}>{item.tipo_txt}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }} 
            
            />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{flex:1, backgroundColor: 'black'}}>    
        <View style={{marginTop: 1}}>
        <TextInput style = {styles.inputIngrediente}
               underlineColorAndroid = "transparent"
               placeholder = "Buscar Ingrediente"
               placeholderTextColor = "#F7456A"
               autoCapitalize = "none"/>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Icon name='stop' color='white' />
        <Text style={{color: 'white'}}>Puede contener</Text></View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Icon name='stop' color='green' />
        <Text style={{color: 'white'}}>Debe contener</Text></View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Icon name='stop' color='red' />
        <Text style={{color: 'white'}}>No debe contener</Text>
        </View>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20, marginLeft: 20,}}>Ingredientes</Text>
            <View
            style={{
                flex:1,
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                flexDirection: 'row',
            }}
            >
                {ingredientes.map((item, index)=>{
                    return(
                        <TouchableOpacity
                        onPress={() => this.selectionHandler(index)}
                        style={{
                            marginTop: 20 ,
                            height: 50,
                            width: 100,
                            borderRadius: 12,
                            backgroundColor:item.backgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                
                        }}
                    >
                        <Text stlye={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>{item.nombre}</Text>
    
                    </TouchableOpacity>
                    
        

                    )
                })
                
                }
                </View>


            </View>
        </ScrollView>

        <Button onPress={this.onPress} label="Filtrar" />


    </View>
   );
}
}

const styles = StyleSheet.create({
    posterImage:{
        width: '100%',
        height: ANCHO_CONTENEDOR * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 20,

    },
    carouselContainer: {
      marginTop: 10,
      alignContent: 'flex-start',
    },
    itemContainer: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      backgroundColor: 'dodgerblue',
    },
    itemLabel: {
      color: 'white',
      fontSize: 24
    },
    counter: {
      marginTop: 25,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        color: '#F7456A',
        borderColor: '#F7456A',
        borderWidth: 1
     },
     inputIngrediente: {
        margin: 15,
        width: 250,
        height: 40,
        color: '#F7456A',
        borderColor: '#F7456A',
        borderWidth: 1
     },
  });

export default BuscarRecetaFiltros;