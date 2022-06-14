import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'


class RecetasGuardadas extends Component{

    state={
        data: [
            {
                id: 1,
                name: 'Guacamole Mexicano',
                user: 'Camila93',
                experience: '19',
                image: 'https://www.recetas.net/Imagen_web/Aguacate-o-Guacamole-Mexicano.aspx?idx=3&nId=4609&hash=d2066219a436924ebb184a25cfa1f2cd',  
            },
            {
                id: 2,
                name: 'Carne al horno',
                user: 'Leonardo55',
                experience: '19',
                image: 'https://www.hola.com/imagenes/cocina/tecnicas-de-cocina/20200824173909/consejos-asar-carne-horno/0-857-699/portada-adobe-m.jpg',  
            },
            {
                id: 3,
                name: 'Fideos Carbonara',
                user: 'Gabriel77',
                experience: '19',
                image: 'https://s1.eestatic.com/2015/04/03/cocinillas/cocinillas_23007746_116140242_1024x576.jpg',  
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: item.image}} style={styles.imgStyle}></Image>
                <View style={{marginLeft: 8}}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textUser}>{item.user}</Text>
                </View>
                </View>

            <TouchableOpacity styles={styles.btnStyle} onPress={()=> this.onDelte(item.id)}>
            <Icon
            name='delete'
            color='#F7456A' />
            </TouchableOpacity>
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