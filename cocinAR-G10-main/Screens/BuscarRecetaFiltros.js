import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Switch, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller, set } from 'react-hook-form';



class BuscarRecetaFiltros extends Component{
    constructor(props){
        super(props);
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
                {id:10,name: 'Chocolate', backgroundColor:'white'},
                {id:11,name: 'Chocolate', backgroundColor:'white'},
                {id:12,name: 'Chocolate', backgroundColor:'white'},
                {id:13,name: 'Chocolate', backgroundColor:'white'},
                {id:14,name: 'Chocolate', backgroundColor:'white'},
                {id:15,name: 'Chocolate', backgroundColor:'white'},
                {id:16,name: 'Chocolate', backgroundColor:'white'},
                {id:17,name: 'Chocolate', backgroundColor:'white'},
                {id:18,name: 'Chocolate', backgroundColor:'white'},
            ],   
        }
    }

componentDidMount() {
        let arr = this.state.dummyData.map((item, index)=>{
            return {...item}
            
        })
        this.setState({dummyData : arr});
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
        

    <View style={{flex:1}}>
        <StatusBar barStyle='dark-content'></StatusBar>
        <ScrollView contentContainerStyle={{flex:1, backgroundColor: 'black'}}>
        <View style={{marginTop: 150}}>
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

    </View>
   );
}
}

export default BuscarRecetaFiltros;