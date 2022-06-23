import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Image,
    StatusBar,
    StyleSheet,
    Alert,
} from 'react-native';

import CounterInput from 'react-native-counter-input';

import * as ImagePicker from 'expo-image-picker';

import {Picker} from '@react-native-picker/picker';

export default class Home extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            
            image: null,
            porciones:'1',
            descripcion:"como va",

            ingredientes: [{
                ingrediente: 'John doe',
                cantidad: '1'
            }],

            pasos: [{
                nombre:"hola",
                imagen:null,
                descripcion:"como va"
            }],

            choosenIndex: 0,
            categoria: null,
            categorias: [
                {label: 'Apple', value: 'apple'},
                {label: 'Banana', value: 'banana'}
              ]
        };
    }

  
    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsEditing:true
        });
        if (!result.cancelled) {
            console.log(result.uri);
          this.setState({ image: result.uri });
        }
      };

    render() {
        const { ingredientes } = this.state
        const { pasos } = this.state
        const {image} = this.state
        const { categorias } = this.state;


        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>

                <CounterInput
                                        width={150}
                                        style={styles.counter}
                                        backgroundColor='#F7456A'
                                        initial={1}
                                        increaseButtonBackgroundColor='black'
                                        decreaseButtonBackgroundColor='black'
                                        horizontal
                                        onChange={(counter) => {
                                        console.log("onChange Counter:", counter);
                                        }}
                                    />


                    {
                        ingredientes.map((item, index) => {

                            return (
                                <View style={{ margin: 5, padding: 10, }}>
                                    <TextInput placeholder='Ingredientes'
                                        value={item.ingrediente}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8 }}
                                        onChangeText={text => {
                                            this.setState({ ingredientes: ingredientes.map((c, innerIndex) => innerIndex === index ? { ...c, ingrediente: text } : c) })
                                        }} />
                                    <TextInput placeholder='Cantidad'
                                        value={item.cantidad}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8, marginTop: 5 }}
                                        onChangeText={text => {
                                            this.setState({ ingredientes: ingredientes.map((c, innerIndex) => innerIndex === index ? { ...c, cantidad: text } : c) })
                                        }} />
                                    <Text style={{
                                        alignSelf: 'flex-start', borderRadius: 4,
                                        padding: 3, marginTop: 5, backgroundColor: 'red', color: 'white'
                                    }} onPress={() => {
                                        const filterList = ingredientes.filter((item, inner) => inner != index)
                                        this.setState({ ingredientes: filterList })
                                    }}>
                                        Remove
                                    </Text>
                                </View>
                            )
                        })
                    }

                    <Text style={{ padding: 16, textAlign: 'center', backgroundColor: 'black', color: 'white' }} onPress={() => {
                        this.setState({
                            ingredientes: [...ingredientes, {
                              ingrediente: '',
                                cantidad: ''
                            }]
                        })
                    }}>
                        Add
                    </Text>

                    {
                        pasos.map((item, index) => {

                            return (
                                <View style={{ margin: 5, padding: 10, }}>

                                    <TextInput placeholder='Ingredientes'
                                        value={item.nombre}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8 }}
                                        onChangeText={text => {
                                            this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, nombre: text } : c) })
                                        }} />

                                    <TextInput placeholder='Cantidad'
                                        value={item.descripcion}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8, marginTop: 5 }}
                                        onChangeText={text => {
                                            this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, descripcion: text } : c) })
                                        }} />


                                    <StatusBar hidden={true} />
                                        {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
                                        <Button title="Pick Image" 
                                            onPress={ async () => {
                                                       let result = await ImagePicker.launchImageLibraryAsync({
                                                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                                        quality: 1,
                                                        allowsEditing:true
                                                        });
                                                        if (!result.cancelled) {
                                                            this.setState({ pasos: pasos.map((c, innerIndex) => innerIndex === index ? { ...c, imagen: result.uri } : c)  });
                                                            
                                                    }
                                                    console.log(pasos);}}/>

                                    <StatusBar style="auto" />

                                    <Text style={{
                                        alignSelf: 'flex-start', borderRadius: 4,
                                        padding: 3, marginTop: 5, backgroundColor: 'red', color: 'white'
                                    }} onPress={() => {
                                        const filterList = pasos.filter((item, inner) => inner != index)
                                        this.setState({ pasos: filterList })
                                    }}>
                                        Remove
                                    </Text>

                                </View>
                            )
                        })
                    }

                    <Text style={{ padding: 16, textAlign: 'center', backgroundColor: 'black', color: 'white' }} onPress={() => {
                        this.setState({
                          pasos: [...pasos, {
                              nombre: '',
                              imagen: null,
                              descripcion: ''
                            }]
                        })
                    }}>
                        Add
                    </Text>

                    <View style={styles.container}>
                <Text style={styles.textStyle}>Picker Example</Text>

                <Picker style={styles.pickerStyle}
                        selectedValue={this.state.categoria}
                        onValueChange={(itemValue, itemPosition) =>
                            this.setState({categoria: itemValue, choosenIndex: itemPosition})}
                            >
                            <Picker.Item label="Pasta" value="Pasta" />
                            <Picker.Item label="Parrilla" value="Parrilla" />
                            <Picker.Item label="Pizza" value="Pizza" />
                            <Picker.Item label="Tacos" value="Tacos" />
                            <Picker.Item label="Sushi" value="Sushi" />
                            <Picker.Item label="China" value="China" />
                            <Picker.Item label="Arabe" value="Arabe" />
                            <Picker.Item label="Argenta" value="Argenta" />
                            <Picker.Item label="Peruana" value="Peruana" />
                            <Picker.Item label="Vegana" value="Vegana" />
                </Picker>

                <Text style={styles.textStyle}> {"Index ="+this.state.choosenIndex}</Text>
            </View>
                    <StatusBar hidden={true} />
                        {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
                        <Button title="Pick Image" onPress={this.pickImage}/>
                    <StatusBar style="auto" />

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    pickerStyle:{
        height: 150,
        width: "80%",
        color: '#344953',
        justifyContent: 'center',
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