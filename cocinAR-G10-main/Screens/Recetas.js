import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';
import { ListItem, SearchBar, Avatar } from "react-native-elements";


class Recetas extends Component{

    state={
        receta: [
            {
                id: 1,
                name: 'Guacamole Mexicano',
                user: 'Camila93',
                rating: 316,
                fechaPublicacion: '10/04/2021',
                image: 'https://www.recetas.net/Imagen_web/Aguacate-o-Guacamole-Mexicano.aspx?idx=3&nId=4609&hash=d2066219a436924ebb184a25cfa1f2cd',
                descripcion: 'Este guacamole es original de México, lugar de origen del guacamole, que sirve como acompañante para cualquiera de tus comidas.',
                porciones: 3,
            },
        ],
        pasos: [{
            
                nro: '1',
                texto: 'En una taza mediana, triture la palta hasta alcanzar la consistencia deseada.',
                image: 'https://imgmedia.buenazo.pe/475x475/buenazo/original/2020/09/21/5f690a710c9613735c7fa8a1.jpg'
            },
            {
                nro: '2',
                texto: 'Agregar la cebolla, el jalapeño, el cilantro y el jugo de limón, y sazona con sal y pimienta. Revuelva para combinar.'
            }
        ],
        tipos: [{
            
            id: '1',
            descripcion: 'Mexicana',
        },
        {
            
            id: '2',
            descripcion: 'Vegana',
        },
        {
            
            id: '3',
            descripcion: 'Vegetariana',
        },
        {
            
            id: '4',
            descripcion: 'Guarnicion',
        },
    ]
    }

    
    

    

    renderItems = ({ item }) => {
        return(
            <><SafeAreaView style={styles.flatlistStyle}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textUser}>Por {item.user}</Text>
                <Text style={styles.textRating}>Rating: {item.rating}</Text>
                <Image source={{ uri: item.image }} style={styles.imgStyle}></Image>
                <Text style={styles.textFecha}>Publicada el: {item.fechaPublicacion}</Text>
                <Text style={styles.tituloDescription}>Descripcion</Text>
                <View style={styles.containerDescription}>
                    <Text style={styles.textDescription}>{item.descripcion}</Text>
                </View>
                <Text style={styles.tituloDescription}>Preparacion</Text>
                <FlatList
                    data={this.state.pasos}
                    renderItem={({ item }) => (
                        <ListItem.Title style={styles.textPasos}>{`Paso ${item.nro} - ${item.texto}`}</ListItem.Title>

                    )} />
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
            </SafeAreaView><SafeAreaView style={styles.containerTipos}>
                    <Text style={styles.tituloDescription}>Tipos</Text>

                    <FlatList
                        data={this.state.tipos}
                        renderItem={({ item }) => (
                            <ListItem.Title style={styles.tagsTipos}>{`${item.descripcion}`}</ListItem.Title>

                        )} />
                </SafeAreaView></>
        
          );
        }
      
    

    render(){
        const {receta} = this.state
        const {pasos} = this.state.pasos
        const {tipos} = this.state.tipos
        return(
        <View style={styles.container}>
            <FlatList data={receta} renderItem={this.renderItems} keyExtractor={(item)=> item.id}></FlatList>
            <FlatList data={pasos} renderItem={this.renderItems} keyExtractor={(item)=> item.nro}></FlatList>
            <FlatList data={tipos} renderItem={this.renderItems} keyExtractor={(item)=> item.id}></FlatList>
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
        width: 200,
        height: 120,
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
        fontWeight: 'bold'
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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagsTipos:{
        alignSelf: "flex-start",
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 20,
        color: 'black',
        fontSize: 18,
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
})

export default Recetas;