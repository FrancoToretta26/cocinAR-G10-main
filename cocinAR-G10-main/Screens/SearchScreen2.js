import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, SearchBar, Avatar } from "react-native-elements";


const SearchScreen2 = ({navigation, route}) => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch ] = useState('');


    useEffect(()=>{
        fetchPosts();
        return() =>{

        }
    }, [])
    

    const fetchPosts = () =>{
        const { itemId, users } = route.params;
        setfilterdData(users);
        setmasterData(users);
        }

    const searchFilter = (text) => {
        if(text){
            const newData = masterData.filter((item) => {
                const itemData = item.receta.nombre ? item.receta.nombre.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            setfilterdData(newData);
            setsearch(text);
        } else{
            setfilterdData(masterData);
            setsearch(text);
        }
         }
    

    const ItemView = ({item}) => {
        return(
            <View style={{
                height: 150,
                width: "100%",
                backgroundColor: 'black',
                marginLeft: 100,
              }}
            >
                            <TouchableOpacity onPress={() => {              navigation.navigate('Recetas', {
                screen: 'SearchScreen',
                params: {recetass: item.receta }, pasos: item.pasos, usuario: item.creatorNickname, ingredientes: item.ingredienteConCantidad, tags: item.tagString
              });}}>

            <Avatar source={{ uri: item.receta.foto }} style={{width: 140, height: 90, }} rounded />
<Text style={{fontWeight: 'bold', fontSize: 18, color: '#F7456A',}}>{item.receta.nombre}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', }}>{item.creatorNickname}</Text></TouchableOpacity>
            </View>
        )
    }

    const ItemSeparatorView = () =>{
        return(
            <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
              marginLeft: 0,
              marginBottom: 5,
            }}
          />
        )
    }




    return(
        <SafeAreaView style={{flex:1, backgroundColor: 'black'}}>
            <View style={StyleSheet.container}>
                <TextInput style={styles.textInputStyle} value={search} placeholder="Buscar receta" underlineColorAndroid="transparent" onChangeText={(text) => searchFilter(text)}>

                </TextInput>
                <FlatList
                    data={filterdData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}    
                >
                </FlatList>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
    itemStyle:{
        padding: 15,
        backgroundColor: 'black'
    },
    textInputStyle:{
        height: 40,
        width:200 ,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        backgroundColor: 'gray',
        marginLeft: 100,
        marginBottom: 20,
    },
    avatar:{
        width: 50,
    }
})

export default SearchScreen2;