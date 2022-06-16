import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

import {registro} from "../controller/user.controller";

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Registro({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = async function(data){
    if (data.mail!=="" && data.alias!=="")
    {
      let datos = {
        mail: data.mail,
        alias: data.alias,
      }
      await AsyncStorage.setItem('alias', data.alias)
      let nuevoRegistro = await registro(datos)
      if(nuevoRegistro){
        alert('Usuario registrado con exito')
        navigation.navigate('FinalizarRegistro')

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
        name="alias"
        rules={{required:{
            value: true,
            message: 'Alias es requerido'
        },
    }}
        control={control}
        render={({ field: { onChange, alias } }) => (
            <Input
                error={errors.alias}
                errorText={errors.alias?.message}
                onChangeText={(alias) => onChange(alias)}
                value={alias}
                placeholder="Alias"
            />
        )}
        />
        <Controller
        defaultValue=''
        name="mail"
        rules={{required:{
            value: true,
            message: 'El correo electronico es requerido'
        },
        pattern:{
            value: EMAIL_REGEX,
            message: 'El correo electronico es invalido'
        }}}
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
        <Text style={styles.TyC}>Continuando, aceptas los terminos y condiciones del servicio y politicas de privacidad</Text>
      <Button onPress={handleSubmit(onSubmit)} label="Registrarse" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
  TyC: {textAlign: 'center', color: "#F7456A"}

});