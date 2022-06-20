import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
} from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [{
                ingrediente: 'John doe',
                cantidad: 1
            }]
        }
    }
    render() {
        const { array } = this.state
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
                </View>
            </SafeAreaView>
        )
    }
}