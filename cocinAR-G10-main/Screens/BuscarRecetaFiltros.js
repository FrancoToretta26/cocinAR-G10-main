import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Switch, Text, View, StatusBar, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller, set } from 'react-hook-form';

import { Icon } from 'react-native-elements'
import { Searchbar } from "react-native-paper";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../utils/animations';
import { SafeAreaView } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.2);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);



const imagenes = [
    {image:"https://thumbs.dreamstime.com/b/pastas-de-penne-rigate-202772.jpg", tipo_txt:"Pasta"},
    {image:"https://saboryestilo.com.mx/wp-content/uploads/2020/01/tips-para-hacer-la-mejor-carne-asada-1200x675.jpg", tipo_txt:"Parrilla"},
    {image:"https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ=", tipo_txt:"Pizza"},
    {image:"https://img.freepik.com/foto-gratis/tacos-mexicanos-carne-res-salsa-tomate-salsa_2829-14221.jpg?w=2000", tipo_txt:"Tacos"},
    {image:"https://t1.rg.ltmcdn.com/es/posts/1/3/0/hacer_sushi_paso_a_paso_16031_600_square.jpg", tipo_txt:"Sushi"},
    {image:"https://assets.unileversolutions.com/recipes-v2/210886.jpg", tipo_txt:"China"},
    {image:"https://assets.unileversolutions.com/recipes-v2/210886.jpg", tipo_txt:'China'},


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
            ingredientList : [],
            notIngredientList : [],
            isLoading: false,
            dummyData:[
                {id:1,name: 'Harina', backgroundColor:'white'},
                {id:2,name: 'Huevo', backgroundColor:'white'},
                {id:3,name: 'Carne Vacuna', backgroundColor:'white'},
                {id:4,name: 'Carne de Cerdo', backgroundColor:'white'},
                {id:5,name: 'Carne Blanca', backgroundColor:'white'},
                {id:6,name: 'Cebolla', backgroundColor:'white'},
                {id:7,name: 'Chocolate', backgroundColor:'white'},
                {id:8,name: 'Chocolate', backgroundColor:'white'},
                {id:9,name: 'Chocolate', backgroundColor:'white'},
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
    
    const {dummyData} = this.state
    var {ingredientList} = this.state
    var {notIngredientList} = this.state
    let arr = dummyData.map((item, index)=>{
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


  render() {
    const {isLoading, dummyData } = this.state
    return(
        

    <View style={{flex:1, backgroundColor:'black'}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20, marginLeft: 20,}}>Tipos</Text>

        <StatusBar barStyle='dark-content'></StatusBar>
        <SafeAreaView style={{backgroundColor:'black', marginTop: 20,}}>
            <StatusBar hidden/>
            <FlatList data={imagenes}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({item, index}) => {
                return(
                    <View style={{width:ANCHO_CONTENEDOR}}>
                        <View style={{marginHorizontal: ESPACIO, padding: ESPACIO, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row', backgroundColor:'black'}}
                        >
                            <Image source={{ uri:item.image}} style={styles.posterImage}></Image>
                        </View>
                        <Text style={{color:'white', alignSelf: 'center', marginBottom: 25, fontSize: 15, fontWeight:'bold'}}>{item.tipo_txt}</Text>
                    </View>
                )
            }} 
            
            />
        </SafeAreaView>
        <ScrollView contentContainerStyle={{flex:1, backgroundColor: 'black'}}>    
        <View style={{marginTop: 1}}>
        <Searchbar placeholder="Ingrediente" containerStyle={{backgroundColor: 'black', borderWidth: 1, borderRadius: 5}} inputStyle={{backgroundColor: 'white'}} placeholderTextColor='gray' platform='android' style={{width:200, marginBottom: 20,}}></Searchbar>
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
                {dummyData.map((item, index)=>{
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
                        <Text stlye={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>{item.name}</Text>
    
                    </TouchableOpacity>
                    
        

                    )
                })
                
                }
                </View>


            </View>
        </ScrollView>

        <Button onPress={''} label="Filtrar" />


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
    }
  });

export default BuscarRecetaFiltros;