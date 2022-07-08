import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, Text, View, Button, Platform, Image} from 'react-native';
import { Avatar } from 'react-native-elements';


import * as ImagePicker from 'expo-image-picker';


export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
  
    useEffect( async () => {
        if(Platform.OS !== 'web'){
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status!== 'granted'){
            alert('Permisson denied!')
        }    
        }
    },[])

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100}} />}
      </View>
    );
  }
  