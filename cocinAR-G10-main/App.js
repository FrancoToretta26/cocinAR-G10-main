import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, TouchableOpacity, Platform, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Screens/Inicio';
import Registro from './Screens/Registro';
import Login from './Screens/Login'
import OlvidePassword from './Screens/OlvidePassword';
import FinalizarRegistro from './Screens/FinalizarRegistro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from './Components/Navbar';
import RecetasGuardadas from './Screens/RecetasGuardadas';
import RegistroReceta from './Screens/RegistroReceta'

import BuscarRecetasFiltros from './Screens/BuscarRecetaFiltros';
import SearchScreen from './Screens/SearchScreen2';
import Recetas from './Screens/Recetas';
import "./ignoreWarnings";
import DescripcionReceta from './Screens/DescripcionRecetaGuardada'
import * as ImagePicker from 'expo-image-picker';
import Home from './Screens/Home';
import ValidarCodigo from './Screens/ValidarCodigo'

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen
      name="Home"
      component={Inicio}
      options={{
        presentation: "modal",
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft:15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
                  ),
                }}
              />
      <Stack.Screen
      name="Registro"
      component={Registro}
      options={{
        title: 'Registro',
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
      name="Login"
      component={Login}
      options={{
        title: 'Ingresar',
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
      name="OlvidePassword"
      component={OlvidePassword}
      options={{
        title: 'Ingrese su correo electrónico',
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
      name="FinalizarRegistro"
      component={FinalizarRegistro}
      options={{
        title: 'Completar el registro',
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
      component={SearchScreen}
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
      name="BuscarRecetasFiltros"
      component={BuscarRecetasFiltros}
      options={{
        title: 'BuscarRecetasFiltros',
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
      name="Recetas"
      component={Recetas}
      options={{
        title: 'Recetas',
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
      name="Descripcion"
      component={DescripcionReceta}
      options={{
        title: 'Descripcion',
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
      }}
        />

<Stack.Screen
      name="ValidarCodigo"
      component={ValidarCodigo}
      options={{
        title: '',
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



