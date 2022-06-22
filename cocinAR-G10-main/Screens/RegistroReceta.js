import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Button,
    Image,
    StatusBar,
    Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default class Home extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

            image: null,

            array: [{
                ingrediente: 'John doe',
                cantidad: '1'
            }],

            pasos: [{
                nombre:"hola",
                imagen:null,
                descripcion:"como va"
            }],

        }
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
          this.setState({image: result.uri});
        }
      };

    render() {
        const { array } = this.state
        const { pasos } = this.state
        const {image} = this.state

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {
                        array.map((item, index) => {

                            return (
                                <View style={{ margin: 5, padding: 10, }}>
                                    <TextInput placeholder='Ingredientes'
                                        value={item.ingrediente}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8 }}
                                        onChangeText={text => {
                                            this.setState({ array: array.map((c, innerIndex) => innerIndex === index ? { ...c, ingrediente: text } : c) })
                                        }} />
                                    <TextInput placeholder='Cantidad'
                                        value={item.cantidad}
                                        style={{ borderRadius: 4, borderWidth: 1, borderColor: '#212121', padding: 8, marginTop: 5 }}
                                        onChangeText={text => {
                                            this.setState({ array: array.map((c, innerIndex) => innerIndex === index ? { ...c, cantidad: text } : c) })
                                        }} />
                                    <Text style={{
                                        alignSelf: 'flex-start', borderRadius: 4,
                                        padding: 3, marginTop: 5, backgroundColor: 'red', color: 'white'
                                    }} onPress={() => {
                                        const filterList = array.filter((item, inner) => inner != index)
                                        this.setState({ array: filterList })
                                    }}>
                                        Remove
                                    </Text>
                                </View>
                            )
                        })
                    }

                    <Text style={{ padding: 16, textAlign: 'center', backgroundColor: 'black', color: 'white' }} onPress={() => {
                        this.setState({
                            array: [...array, {
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

                    <StatusBar hidden={true} />
      {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
      <Button title="Pick Image" onPress={this.pickImage}/>
      <StatusBar style="auto" />

                </View>
            </SafeAreaView>
        )
    }
}