import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, SearchBar, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";


const SearchScreen2 = ({navigation, route}) => {
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setsearch ] = useState('');
    const [isModalVisibleSort, setModalVisibleSort] = useState(false);

    const toggleModalSort = () => {
        setModalVisibleSort(!isModalVisibleSort);
      };

    useEffect(()=>{
        fetchPosts();
        return() =>{

        }
    }, [])
    

    const fetchPosts = () =>{
        const { itemId, users } = route.params;
        setfilterdData(users);
        setmasterData(users);
        }

    const searchFilter = (text) => {
        if(text){
            const newData = masterData.filter((item) => {
                const itemData = item.receta.nombre ? item.receta.nombre.toUpperCase() : ''.toUpperCase();
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

         const handleOrderClickModal = () => {
            setModalVisibleSort(!isModalVisibleSort);
          };


         const handleOrderClick = () => {
            let newList = [...filterdData];
        
            newList.sort((a, b) => (a.receta.nombre > b.receta.nombre ? 1 : b.receta.nombre > a.receta.nombre ? -1 : 0));
        
            setfilterdData(newList);
            setModalVisibleSort(!isModalVisibleSort);

          };

          
         const handleOrderClickUser = () => {
            let newList = [...filterdData];
        
            newList.sort((a, b) => (a.creatorNickname > b.creatorNickname ? 1 : b.creatorNickname > a.creatorNickname ? -1 : 0));
        
            setfilterdData(newList);
            setModalVisibleSort(!isModalVisibleSort);

          };
    

    const ItemView = ({item}) => {
        return(
            <><View style={{
                    height: 150,
                    width: "100%",
                    backgroundColor: 'black',
                    marginLeft: 100,
                }}
                >
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Recetas', {
                            screen: 'SearchScreen',
                            params: { recetass: item.receta }, pasos: item.pasos, usuario: item.creatorNickname, ingredientes: item.ingredienteConCantidad, tags: item.tagString, calificacion: item.calificacion
                        });
                    } }>

                        <Avatar source={{ uri: item.receta.foto }} style={{ width: 140, height: 90, }} rounded />
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F7456A', }}>{item.receta.nombre}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white', }}>{item.creatorNickname}</Text></TouchableOpacity>
                </View></>
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
            <View>
                <TouchableOpacity onPress={handleOrderClickModal} style={styles.orderButton}>
                    <MaterialCommunityIcons
                        name="order-alphabetical-ascending"
                        size={32}
                        color="#F7456A" />
                </TouchableOpacity></View>
                
                <TextInput style={styles.textInputStyle} value={search} placeholder="Buscar receta" underlineColorAndroid="transparent" onChangeText={(text) => searchFilter(text)}>
                </TextInput>
                <View>
                <View>
      <Modal style={styles.modal}isVisible={isModalVisibleSort}>
      <View style={styles.modalcontainer} >
          <Text style={styles.ModalText}> Seleccione el orden deseado</Text>
          </View>
          <View style={[{flexDirection:'row',alignItems:'center'}]}>
            <View style={[{flex:1,flexDirection:'row'}]}>
          <Pressable style={styles.buttonSort} onPress={handleOrderClick}>
      <Text style={styles.modalbuttontext}>Por Receta</Text>
    </Pressable>
    </View>
    <View stlye={[{justifyContent:'space-evenly', marginVertical:10}]}>
    <Pressable style={styles.buttonSort2} onPress={handleOrderClickUser}>
      <Text style={styles.modalbuttontext}>Por Usuario</Text>
    </Pressable>
    </View>
    </View>
      </Modal>
      </View>
      </View>
                <FlatList
                    data={filterdData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}    
                >
                </FlatList>
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
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    avatar:{
        width: 50,
    },
    orderButton: {
        width: 55,
        marginLeft: 20,
        marginBottom: -50,
        flexWrap: 'wrap',
      },
      modal: {
        position:'relative',
        bottom:-350,
        height:10,
        width: 395,
        marginTop: 250,
        marginBottom: 340,
        marginHorizontal: 0,
        alignItems: 'center',
        backgroundColor: '#222121',
        borderRadius:30
      },
      ModalText: {
        fontSize: 25,
        lineHeight: 20 * 1.4,
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 10,
        textAlign: 'center',
        color: '#FFFFFFFF',
        backgroundColor: '#222121',
        fontWeight: "bold",
      },
      buttonSort: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal:20,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#FFFFFF',
      },
      buttonSort2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginHorizontal:20,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#FFFFFF',
      },
    
      modalcontainer:{
        marginBottom: 30,
      },
    
      modalbuttontext:{
        color:'#000000',
        fontWeight: "bold",
        fontSize: 18,
      },
})

export default SearchScreen2;