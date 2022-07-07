import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import {useNavigation} from 'react-navigation'

import { useForm, Controller } from 'react-hook-form';

import { getRecipes } from '../controller/recipe.controller';
import { recuperarPass, resetPassword } from '../controller/user.controller';


export default function CambiarPassword({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = async function (data){
    if(data.npassword==data.password){
      console.log('entre al if')
    let cambiarPass = await resetPassword(data.password)
    if(cambiarPass.rdo==0){
      navigation.navigate('ValidarCodigoPass')
      alert('Se ha actualizado la contraseña')
    }
    else{
      alert('Ha ocurrido un error')
    }
  }
  else{
    alert('Las contraseñas no coinciden')
  }
    }
  


  return (
    <View style={styles.container}>
        <Controller
        defaultValue=""
        name="password"
        rules={{required:{
            value: true,
            message: 'La password es requerida'
        },}}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.password}
                errorText={errors.password?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Contraseña"
            />
        )}
        />

<Controller
        defaultValue=""
        name="npassword"
        rules={{required:{
            value: true,
            message: 'La password es requerida'
        },}}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.npassword}
                errorText={errors.npassword?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Confirmar Contraseña"
            />
        )}
        />
      <Button onPress={handleSubmit(onSubmit)} label="Continuar" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],

});