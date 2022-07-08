import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, ImageBackground, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import Card from '../Components/RecipeCard';
import Header from '../Components/Header';
import { t, color } from 'react-native-tailwindcss';
import { Searchbar } from 'react-native-paper';
import Button from '../Components/ButtonSearch'
import { useForm, Controller } from 'react-hook-form';
import { getBestRecipes, getIngredients, getRecipes, getRecipesForLater } from '../controller/recipe.controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconLabel from '../Components/IconLabel';

const iconColor = '#F7456A';
const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;

export default function Home({navigation, route}) {
    const [filterdData, setfilterdData] = useState([]);
    const homeName = "Descubrir";
    const detailsName = "Agregar";
    const settingsName = "Guardadas";
    const { handleSubmit} = useForm();





  useEffect(() => {
    async function loadData() {
      const response = await getBestRecipes('');
      setfilterdData(response); // change this based on the response, you may or may not need to call json() on it
    }
    loadData();
}, []);





    const recipes = [
      {
        name: 'Guacamole Mexicano',
        author: 'Por Camila93',
        rating: '316',
        image: require('../assets/GuacamoleMexicano.jpg'),
        id: 1,
      },
      {
        name: 'Guacamole Americano',
        author: 'Por Leonardo77',
        image: require('../assets/GuacamoleAmericano.jpg'),
        rating: '295',
        id: 2,
      },
    ];

    const onSubmit = async function(data){
       let ingredientes = await getIngredients();
       if(ingredientes){
        navigation.navigate('BuscarRecetasFiltros', {
          postId: 3006,
          ingredientes: ingredientes})
       }
      }

   
    
  return (
    <View style={styles.container}>
    <Button onPress={handleSubmit(onSubmit)} label="Buscar" />


    <Header label="Mejores Recetas" />
    {/* <Card /> */}
    <StatusBar barStyle="dark-content" />
    <FlatList
      data={filterdData}
      renderItem={( {item} ) => (
        <View style={styles.containerCard}>
      <View style={styles.cardContainer}>
      <Image source={{ uri: item.receta.foto }} style={styles.imageStyle}></Image>
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{item.receta.nombre}</Text>
          <Text style={styles.categoryStyle}>{item.creatorNickname}</Text>

          <View style={styles.iconLabelStyle}>
            <IconLabel name="md-heart" color={iconColor}></IconLabel> 
            <Text style={styles.deliveryTime}>{item.receta.calificacion}</Text>
          </View>
        </View>
      </View>
    </View> )}
      keyExtractor={(item, index) => index.toString()}

      /></View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
  ButtonSearch:{
  },
  containerCard: {
    width: deviceWidth - 50,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#222121',
    height: 250,
  },
  imageStyle: {
    height: 180,
    width: deviceWidth - offset,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderRadius: 40,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    marginLeft: 70,
    fontSize: 20,
    fontWeight: '800',
    color: 'white'
  },
  categoryStyle: {
    marginLeft: 230,
    fontWeight: '400',
    color: "#F7456A"
  },
  infoStyle: {
    marginBottom: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    color: 'white'
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: -20,
    color: 'white'
  },
  deliveryTime:{
      color: 'white'
  }
});