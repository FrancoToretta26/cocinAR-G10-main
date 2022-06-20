import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Screens/Inicio';
import Registro from './Screens/Registro';
import Login from './Screens/Login'
import OlvidePassword from './Screens/OlvidePassword';
import SearchScreen1 from './Screens/SearchScreen';
import FinalizarRegistro from './Screens/FinalizarRegistro';
import Prueba from './Components/ImagePicker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from './Components/Navbar';
import RecetasGuardadas from './Screens/RecetasGuardadas';
import RegistroReceta from './Screens/RegistroReceta'


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
      name="Inicio"
      component={Navbar}
      options={{
        title: 'CocinAR',
        headerLeft: null,
        headerStyle:{
          backgroundColor: "#222121",
        },
        headerTintColor: 'white'
      }}
              />

    
<Stack.Screen
      name="SearchScreen"
      component={SearchScreen1}
      options={{
        title: 'SearchScreen',
        headerTintColor: '#F7456A',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back-outline" size={25} color="#F7456A" />
          </View>
                  ),
                }}
              />

<Stack.Screen
      name="RecetasGuardadas"
      component={RecetasGuardadas}
      options={{
        title: 'RecetasGuardadas',
        headerTintColor: '#F7456A',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back-outline" size={25} color="#F7456A" />
          </View>
                  ),
                }}
              />

<Stack.Screen
      name="RegistroReceta"
      component={RegistroReceta}
      options={{
        title: 'RegistroReceta',
        headerTintColor: '#F7456A',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#222121',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back-outline" size={25} color="#F7456A" />
          </View>
                  ),
                }}
              />

    </Stack.Navigator>
  </NavigationContainer>
  );
}



