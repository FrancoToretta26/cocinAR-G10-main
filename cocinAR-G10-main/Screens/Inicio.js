import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, ImageBackground, TouchableOpacity, FlatList } from 'react-native';

import Card from '../Components/RecipeCard';
import Header from '../Components/Header';


export default function HomeScreen({ navigation, route }) {
  const image = { uri: "https://cdn.discordapp.com/attachments/962833595985190923/977356901325090916/02_Roasting.jpg" };


  return (
<View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.header}>
            <Text style={styles.text}>Cocin</Text><Text style={styles.header2}>AR</Text></View>
          <Text style={styles.description}>Las mejores recetas en un solo lugar.</Text>
          <View style={styles.fixToText}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>{"Ingresar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={styles.appButtonContainerRegister}>
              <Text style={styles.appButtonRegister}>{"Registrarse"}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    header:{
      marginLeft: 120,
      marginTop: 460,
      flexDirection: 'row',
      textAlign: 'center',
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
    header2: {
      color: "#F7456A",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
    description: {
      color: "white",
      fontSize: 20,
      lineHeight: 44,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    fixToText: {
      marginLeft: 50,
      marginRight: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    appButtonContainer: {
      marginTop: 25,
      elevation: 8,
      backgroundColor: "#F7456A",
      borderRadius: 48,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: "white"
    },
    appButtonContainerRegister: {
      marginTop: 25,
      elevation: 8,
      backgroundColor: "#F7A1B3",
      borderRadius: 48,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: "white"
    },
    appButtonText: {
      backgroundColor: "#F7456A",
      fontSize: 22,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
    },
    appButtonRegister:{
      backgroundColor: "#F7A1B3",
      fontSize: 22,
      color: "white",
      fontWeight: "bold",
      alignSelf: "center",
  
    },
  });
  
  