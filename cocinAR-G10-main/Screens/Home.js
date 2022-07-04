import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Card from '../Components/RecipeCard';
import Header from '../Components/Header';
import { t, color } from 'react-native-tailwindcss';
import { Searchbar } from 'react-native-paper';
import Button from '../Components/ButtonSearch'
import { useForm, Controller } from 'react-hook-form';
import { getIngredients, getRecipes, getRecipesForLater } from '../controller/recipe.controller';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation, route}) {
    const [filterdData, setfilterdData] = useState([]);
    const homeName = "Descubrir";
    const detailsName = "Agregar";
    const settingsName = "Guardadas";
    const { handleSubmit} = useForm();
    const recipess = AsyncStorage.getItem('recetas');
    console.log(recipess)

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
       console.log(ingredientes, 'ingredientes pa')
       if(ingredientes){
        navigation.navigate('BuscarRecetasFiltros', {
          postId: 3006,
          ingredientes: ingredientes})
       }
      }

   
    
  return (
    <><View style={styles.container}>
    <Button onPress={handleSubmit(onSubmit)} label="Buscar" />


    <Header label="Mejores Recetas" />
    {/* <Card /> */}
    <StatusBar barStyle="dark-content" />

    <FlatList
      data={recipess}
      renderItem={({ item }) => {
        return <Card info={item} />;
      } }
      keyExtractor={(recipe) => recipe.id.toString()}
      showsVerticalScrollIndicator={false} /></View></>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
  ButtonSearch:{
  }
});