import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../controller/user.controller';

import { getRecipes } from '../controller/recipe.controller';

export default function Login({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };


  const onSubmit = async function(data){
    if (data.mail!=="" && data.password!=="")
    {
      let datos = {
        mail: data.mail,
        password: data.password,
      }
      console.log(datos)
      let nuevoLogin = await login(datos)
      let recetas = await getRecipes(data);
      await AsyncStorage.setItem('recetas', JSON.stringify(recetas))
      console.log(recetas, 'recetas previo al if')
      if(nuevoLogin.rdo==0){
        alert('Usuario logueado con exito')
        navigation.navigate('Inicio')
      }
      else{
        alert('Reintente nuevamente')
      }
    }
  };

    
  


  return (
    <View style={styles.container}>
        <Controller
        defaultValue=""
        name="mail"
        rules={{required:{
            value: true,
            message: 'El Correo Electrónico es obligatorio'
        },
        pattern:{
            value: EMAIL_REGEX,
            message: 'El correo electronico es invalido'
        }
    }}
        control={control}
        render={({ field: { onChange, mail } }) => (
            <Input
                error={errors.mail}
                errorText={errors.mail?.message}
                onChangeText={(mail) => onChange(mail)}
                value={mail}
                placeholder="Correo Electrónico"
            />
        )}
        />
        <Controller
        defaultValue=""
        name="password"
        rules={{required:{
            value: true,
            message: 'La contraseña es obligatoria'
        }}}
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
        <Text style={styles.olvidoPass} onPress={() => navigation.navigate('OlvidePassword')}> ¿Olvidaste tu contraseña?</Text>
      <Button onPress={handleSubmit(onSubmit)} label="Ingresar" />

    </View>
  );
}

const styles = StyleSheet.create({
    container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
    olvidoPass: {textAlign: 'center', color: "#F7456A"}
  
  });