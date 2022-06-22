import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from '../Screens/Registro';
import Login from '../Screens/Login'
import Prueba from './ImagePicker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from './RecipeCard';
import Header from './Header';
import Home2 from '../Screens/Home'
import CargarReceta from '../Screens/CargarReceta';
import SearchScreen from '../Screens/SearchScreen'
import RecetasGuardadas from '../Screens/RecetasGuardadas';
import Recetas from '../Screens/Recetas';
import { getRecipesForLater } from '../controller/recipe.controller';

const Stack = createStackNavigator();

export default function Home({navigation}) {
        const homeName = "Descubrir";
    const detailsName = "Agregar";
    const settingsName = "Guardadas";

    const Tab = createBottomTabNavigator();

    const onSubmit = async function(props){
      let recetasForLater = await getRecipesForLater();
      if(recetasForLater){
        console.log('hola')
        navigation.navigate('RecetasGuardadas', {
          postId: 3100,
          users: recetasForLater})
      }

    }
  
  return (
 

    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'search' : 'search';

          } else if (rn === detailsName) {
            iconName = focused ? 'add-outline' : 'add-outline';

          } else if (rn === settingsName) {
            iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#F7456A',
        activeBackgroundColor: "black",
        inactiveBackgroundColor: 'black',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 12 },
        style: { padding: 10, height: 70,}
      }}>

      <Tab.Screen name={homeName} component={Home2} 
      options={{
        title: 'Descubrir',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        headerTintColor:'#F7456A',
        headerBackTitleVisible: false,
      }}
      />
            <Tab.Screen name={detailsName} component={CargarReceta} 
      options={{
        title: 'Agregar',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        headerTintColor:'#222121',
        headerBackTitleVisible: true,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back-outline" size={25} color="#F7456A" />
          </View>),
      }}
      />
      <Tab.Screen name={settingsName} component={RecetasGuardadas}
      options={{
        title: 'Guardadas',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        tabBarButton: props => (
          <TouchableOpacity {...props} onPress={(onSubmit)} />),
        headerTintColor:'#F7456A',
        headerBackTitleVisible: true,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back-outline" size={25} color="#F7456A" />
          </View>),
      }}
      />

    </Tab.Navigator>
  );
}



