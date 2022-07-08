import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import {deleteRecipeForLater} from '../controller/recipe.controller';


class RecetasGuardadas extends Component{

    state={
    }

    onDelte = (id) =>{
        let filterArray = users.filter((val, i)=>{
            if(val.idUsuario !== id){
                return val.idUsuario
            }
        })
        this.setState({users: filterArray})
    }

  

    renderItems = ({ item }) => {
        return(
            <View style={styles.flatlistStyle}>
                        <TouchableOpacity onPress={() => {              this.props.navigation.navigate('DescripcionReceta', {
            screen: 'SearchScreen',
            params: {recetass: item.receta }, pasos: item.pasos, usuario: item.nickName, ingredientes: item.ingredienteConCantidad, tags: item.tagString, calificacion: item.calificacion
          });}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: item.receta.foto}} style={styles.imgStyle}></Image>
                <View style={{marginLeft: 8}}>
                <Text style={styles.textName}>{item.receta.nombre}</Text>
                <Text style={styles.textUser}>{item.nickName}</Text>
                </View>
                </View></TouchableOpacity>

            <TouchableOpacity styles={styles.btnStyle} onPress={async () => {
                        let deleteReceta = await deleteRecipeForLater(item.idRecetaPorUsuario)
                        if(deleteReceta.rdo==0){
                            alert('Receta Eliminada')
                            this.props.navigation.navigate('Inicio')

            }}}>
            <Icon
            name='delete'
            color='#F7456A' />
            </TouchableOpacity>
            </View>
        )
    }

    render(){
        const {data} = this.state
        const { postId, users } = this.props.route.params;
        return(
        <View style={styles.container}>
            <FlatList data={users} renderItem={this.renderItems} keyExtractor={(item)=> item.id}></FlatList>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222121',
        marginBottom: 16,
        padding: 8,
        borderRadius: 8
    },
    imgStyle:{
        width: 120,
        height: 80,
        borderRadius: 20
    },
    btnStyle:{
        backgroundColor: '#037272',
        padding: 10,
        borderRadius: 8,
    },
    textName:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textUser:{
        color: '#F7456A',
        fontSize: 15,
        fontWeight: 'bold',
    },    
})

export default RecetasGuardadas;