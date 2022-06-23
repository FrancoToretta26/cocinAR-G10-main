import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, Text, View, Platform, Button, Image } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import { Avatar } from 'react-native-elements';


import Input from '../Components/Input'
import Button2 from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';


import { finalizarRegistro } from '../controller/user.controller';

import { getRecipes } from '../controller/recipe.controller';

import * as ImagePicker from 'expo-image-picker';



export default function Registro({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };



  const onSubmit = async function(data){
    const avatar = image;
    if(data.password==data.password2){
        if (data.nombre!=="" && data.apellido!=="" && data.password!=="" && data.image!="")
        {
        let datos = {
            nombre: data.nombre,
            apellido: data.apellido,
            password: data.password,
            avatar: avatar
        }
        let finRegistro = await finalizarRegistro(datos)
        if(finRegistro){
            alert('Usuario registrado con exito')
            let recetas = await getRecipes(data);
            if(recetas){
                const nuevaData = JSON.stringify(recetas)
              navigation.navigate('Inicio', {
                postId: 3006,
                users: nuevaData})
            }

        }
        else{
            alert('Reintente nuevamente')
        }
        }
    }
   else{
    alert('Las contraseñas no coinciden')
   } 
  };

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
    <View style={styles.container}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Controller
        defaultValue=""
        name="imagen"
        control={control}
        render={({ field: { onChange, image } }) => (
            <Button value={image} title="Elegir Foto" onPress={pickImage} onChange={(image) => onChange(image)} />
        )}
        />
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100}} />}

      </View>
        <Controller
        defaultValue=""
        name="nombre"
        rules={{required:{
            value: true,
            message: 'Nombre'
        },
    }}
        control={control}
        render={({ field: { onChange, nombre } }) => (
            <Input
                error={errors.nombre}
                errorText={errors.nombre?.message}
                onChangeText={(nombre) => onChange(nombre)}
                value={nombre}
                placeholder="Nombre"
            />
        )}
        />
        <Controller
        defaultValue=""
        name="apellido"
        rules={{required:{
            value: true,
            message: 'Apellido'
        },
    }}
        control={control}
        render={({ field: { onChange, apellido } }) => (
            <Input
                error={errors.apellido}
                errorText={errors.apellido?.message}
                onChangeText={(apellido) => onChange(apellido)}
                value={apellido}
                placeholder="Apellido"
            />
        )}
        />
        
                <Controller
        defaultValue=""
        name="password"
        rules={{required:{
            value: true,
            message: 'Contraseña'
        },
    }}
        control={control}
        render={({ field: { onChange, password } }) => (
            <Input
                error={errors.password}
                errorText={errors.password?.message}
                onChangeText={(password) => onChange(password)}
                value={password}
                secureTextEntry
                placeholder="Contraseña"
            />
        )}
        />
                        <Controller
        defaultValue=""
        name="password2"
        rules={{required:{
            value: true,
            message: 'Contraseña'
        },
    }}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.password2}
                errorText={errors.password2?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry
                placeholder="Confirmar Contraseña"
            />
        )}
        />
        <Text style={styles.TyC}>Continuando, aceptas los terminos y condiciones del servicio y politicas de privacidad</Text>
        <Button2 onPress={handleSubmit(onSubmit)} label="Registrarse" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
  TyC: {textAlign: 'center', color: "#F7456A"},
});