import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { shadow } from 'react-native-paper';
import { ListItem, SearchBar, Avatar } from "react-native-elements";


class Recetas extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
          };
    }


    // state={
    //     pasos: [{
            
    //             nro: '1',
    //             texto: 'En una taza mediana, triture la palta hasta alcanzar la consistencia deseada.',
    //             image: 'https://imgmedia.buenazo.pe/475x475/buenazo/original/2020/09/21/5f690a710c9613735c7fa8a1.jpg'
    //         },
    //         {
    //             nro: '2',
    //             texto: 'Agregar la cebolla, el jalapeño, el cilantro y el jugo de limón, y sazona con sal y pimienta. Revuelva para combinar.'
    //         }
    //     ],
    //     tipos: [{
            
    //         id: '1',
    //         descripcion: 'Mexicana',
    //     },
    //     {
            
    //         id: '2',
    //         descripcion: 'Vegana',
    //     },
    //     {
            
    //         id: '3',
    //         descripcion: 'Vegetariana',
    //     },
    //     {
            
    //         id: '4',
    //         descripcion: 'Guarnicion',
    //     },
    // ]
    // }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%",
            }}
          />
        );
      };
    
      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Buscar"
            lightTheme
            round
            onChangeText={this.handleSearch}
            value={this.state.query}
          />
        );
      };
    
      renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE",
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };

    
    

    
    

    render(){
        const { postId, recetass} = this.props.route.params;
        const { idd, pasos} = this.props.route.params;

        console.log(recetass)
        console.log(pasos)
        return(
            <View style={styles.container}>
            <SafeAreaView  style={styles.flatlistStyle}>

                <Text style={styles.textName}>{recetass.nombre}</Text>
                <Text style={styles.textUser}>Por {recetass.idUsuario}</Text>
                <Text style={styles.textRating}>Rating: {recetass.rating}</Text>
                <Image source={{ uri: recetass.foto }} style={styles.imgStyle}></Image>
                <Text style={styles.textFecha}>Publicada el: {recetass.fechaPublicacion}</Text>
                <Text style={styles.tituloDescription}>Descripcion</Text>
                <View style={styles.containerDescription}>
                <Text style={styles.textDescription}>{recetass.descripcion}</Text></View>
            </SafeAreaView>
            </View>
        )}


        /* <FlatList
          data={recetass}
          renderItem={({ recetass }) => (
            <ListItem bottomDivider>
            <Avatar style={styles.avatar} source={{ uri: recetass.foto }} rounded />
            <ListItem.Content >
              <ListItem.Title style={styles.content}>{recetass.nombre}</ListItem.Title>
              <ListItem.Subtitle>{recetass.descripcion}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={35} color="pink" />
            
            
          </ListItem>
            
            
            
            // <View>

            //     <Text style={styles.textName}>{item.nombre}</Text>
            //     <Text style={styles.textUser}>Por {item.idUsuario}</Text>
            //     <Text style={styles.textRating}>Rating: {item.rating}</Text>
            //     <Image source={{ uri: item.image }} style={styles.imgStyle}></Image>
            //     <Text style={styles.textFecha}>Publicada el: {item.fechaPublicacion}</Text>
            //     <Text style={styles.tituloDescription}>Descripcion</Text>
            //     <View style={styles.containerDescription}>
            //         <Text style={styles.textDescription}>{item.descripcion}</Text>
            //     </View>
            //     </View>
          )}
          keyExtractor={(item) => item.idReceta}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ></FlatList> */}
        

    
                
                
                
        //         <Text style={styles.tituloDescription}>Preparacion</Text>
        //         <FlatList
        //             data={this.state.pasos}
        //             renderItem={({ item }) => (
        //                 <ListItem.Title style={styles.textPasos}>{`Paso ${item.nro} - ${item.texto}`}</ListItem.Title>

        //             )} />
        //         <View style={styles.containerRating}>
        //             <Text style={styles.textoRating}>Recomendarias esta receta? </Text>
        //             <Icon
        //             style={styles.iconRating}
        //             name='done'
        //             color='green' />
        //             <Icon
        //             style={styles.iconRating}
        //             name='close'
        //             color='red' />
        //         </View>
        //     </SafeAreaView><SafeAreaView style={styles.containerTipos}>
        //             <Text style={styles.tituloDescription}>Tipos</Text>

        //             <FlatList
        //                 data={this.state.tipos}
        //                 renderItem={({ item }) => (
        //                     <ListItem.Title style={styles.tagsTipos}>{`${item.descripcion}`}</ListItem.Title>

        //                 )} />
        
        //   );
    
        

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
    content:{
        fontSize: 30
    },
    avatar:{
        width: 100,
    }
})

export default Recetas;