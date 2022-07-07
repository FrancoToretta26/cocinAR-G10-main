import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { Icon } from 'react-native-elements'
import { getRecipes } from '../controller/recipe.controller';
import Button from '../Components/Button';


const SearchScreen2 = ({navigation, route}) => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch ] = useState('');
    const [colour, setColour] = useState('white');
    const [ingredientList, setIngredientList] = useState([]);
    const [notingredientList, setnotIngredientList] = useState([]);




    useEffect(()=>{
        fetchPosts();
        return() =>{

        }
    }, [])
    

    const fetchPosts = () =>{
        const { itemId, ingredientes } = route.params;
        console.log(ingredientes, 'ingredientes ingresando al coso')
        setfilterdData(ingredientes);
        setmasterData(ingredientes);
        }

    const searchFilter = (text) => {
        if(text){
            const newData = masterData.filter((item) => {
                const itemData = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
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

         const selectionHandler=(ind)=>{
            const { postId, ingredientes } = route.params;
            let arr = ingredientes.map((item, index)=>{
                if(ind == item.idIngrediente){
                    if(ind == item.idIngrediente && item.backgroundColor=='red'){
                        item.backgroundColor = 'white'
                        setColour(item.backgroundColor = 'white')
                        var ubicacion = notingredientList.indexOf(item)
                        notingredientList.splice(ubicacion,1)
                        console.log('hice un splice notingredient')
                    }
                    else if(ind == item.idIngrediente && item.backgroundColor=='white'){
                        item.backgroundColor = 'green'
                        setColour(item.backgroundColor = 'green')
                        ingredientList.push(item)
                        console.log(ingredientList);
                    }
        
                    else if(ind == item.idIngrediente && item.backgroundColor=='green'){
                        item.backgroundColor = 'red'
                        setColour(item.backgroundColor = 'red')
                        notingredientList.push(item)
                        var ubicacion = ingredientList.indexOf(item)
                        ingredientList.splice(ubicacion,1)
                    }
                    console.log(notingredientList);
                    
                }
                setIngredientList(ingredientList)
                setnotIngredientList(notingredientList)
                return{...item}
            })
        
          }

       const onPress = async () => {
            console.log(ingredientList,'ingredient list dentro del onpress')
            console.log(notingredientList,'notingredient list dentro del onpress')
        
            var data = {
                ingredientes : ingredientList,
                notIngredientes : notingredientList,
            }
            let filtrarRecetas = await getRecipes(data);
            if(filtrarRecetas){
                navigation.navigate('SearchScreen', {
                    postId: 3006,
                    users: filtrarRecetas})
                }
          }
    

    const ItemView = ({item}) => {
        return(
            <View
                style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                }}
            >
                    <TouchableOpacity
                        onPress={''}
                        style={{
                            marginTop: 20,
                            height: 50,
                            width: 100,
                            borderRadius: 12,
                            backgroundColor: item.backgroundColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text stlye={{ color: 'white', fontWeight: 'bold', fontSize: 15, }}>{item.nombre}</Text>

                    </TouchableOpacity>


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
                <TextInput style={styles.textInputStyle} value={search} placeholder="Buscar Ingrediente" underlineColorAndroid="transparent" onChangeText={(text) => searchFilter(text)}>

                </TextInput>
                <Button onPress={onPress} label="Filtrar" />

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
                <View
            style={{
                flex:1,
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                flexDirection: 'row',
            }}
            >
                {filterdData.map((item, index)=>{
                    return(
                        <TouchableOpacity
                        onPress={() => selectionHandler(item.idIngrediente)}
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