import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';


class Recetas extends Component{

    state={
        data: [
            {
                id: 1,
                name: 'Guacamole Mexicano',
                user: 'Camila93',
                rating: 316,
                fechaPublicacion: '10/04/2021',
                image: 'https://www.recetas.net/Imagen_web/Aguacate-o-Guacamole-Mexicano.aspx?idx=3&nId=4609&hash=d2066219a436924ebb184a25cfa1f2cd',
                descripcion: 'Este guacamole es original de México, lugar de origen del guacamole, que sirve como acompañante para cualquiera de tus comidas.',
                porciones: 3,
                paso1: "En una taza mediana, triture la palta hasta alcanzar la consistencia deseada.", 
                imagePaso1: "https://imgmedia.buenazo.pe/475x475/buenazo/original/2020/09/21/5f690a710c9613735c7fa8a1.jpg",
                paso2: "Agregar la cebolla, el jalapeño, el cilantro y el jugo de limón, y sazona con sal y pimienta. Revuelva para combinar.",
                tags: "Mexicana"

            },
        ]
    }

    onDelte = (id) =>{
        const { data } = this.state
        let filterArray = data.filter((val, i)=>{
            if(val.id !== id){
                return val
            }
        })
        console.log('filter array', filterArray)
        this.setState({data: filterArray})
    }

    
    

    renderItems = ({ item }) => {
        return(
            <View style={styles.flatlistStyle}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textUser}>Por {item.user}</Text>
                <Text style={styles.textRating}>Rating: {item.rating}</Text>
                <Image source={{uri: item.image}} style={styles.imgStyle}></Image>
                <Text style={styles.textFecha}>Publicada el: {item.fechaPublicacion}</Text>
            <Text style={styles.tituloDescription}>Descripcion</Text>
            <View style={styles.containerDescription}>
            <Text style={styles.textDescription}>{item.descripcion}</Text>
            </View>
            <Text style={styles.tituloDescription}>Preparacion</Text>

            <View style={styles.containerPasos}>
            <Text style={styles.conteoPasos}>1</Text>
            <Image source={{uri: item.imagePaso1}} style={styles.imgStyle}></Image>
            <Text style={styles.textPasos}>{item.paso1}</Text>
            </View>
            <View style={styles.containerPasos2}>
            <Text style={styles.conteoPasos}>2</Text>
            <Text style={styles.textPasos}>{item.paso2}</Text>
            </View>
            </View>
        )
    }

    render(){
        const {data} = this.state
        return(
        <View style={styles.container}>
            <FlatList data={data} renderItem={this.renderItems} keyExtractor={(item)=> item.id}></FlatList>
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
        justifyContent: 'space-between',
        alignItems: 'center',
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
    containerPasos:{
        width: 350,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7456A',
        marginBottom: 20,
        padding: 15,
        borderRadius: 20
    },
    textPasos:{
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 10,
        fontWeight: 'bold'
    },
    conteoPasos:{
        fontSize: 42,
        color: 'black',
        marginRight: 270,
        marginBottom: 0,
        shadow: 20,
        fontWeight: 'bold'
    },
    containerPasos2:{
        width: 350,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FA869E',
        marginBottom: 20,
        padding: 15,
        borderRadius: 20
    },
})

export default Recetas;