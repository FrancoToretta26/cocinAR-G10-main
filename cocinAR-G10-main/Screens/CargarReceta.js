import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { validateRecipe } from '../controller/recipe.controller';

export default function CargarReceta({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();



  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = async function(data){
    await AsyncStorage.setItem('nombreReceta', data.nombreReceta)
    let verificarReceta = await validateRecipe('')
    if(verificarReceta){
      alert('Aca deberia aparecer modal ')
      console.log(verificarReceta, 'verificarreceta')
        navigation.navigate('EditarReceta', {
          screen: 'EditarReceta',
          params: verificarReceta,
      });
    }
    else{
      navigation.navigate('RegistroReceta')
    }

  };

    
  


  return (

    <View style={styles.container}>
        <Text style={styles.olvidoPass}> Ingresar el nombre del plato</Text>
        <Controller
        defaultValue=""
        name="nombreReceta"
        rules={{required:{
            value: true,
            message: 'El Nombre es Obligatorio'
        },
    }}
        control={control}
        render={({ field: { onChange, nombreReceta } }) => (
            <Input
                error={errors.nombreReceta}
                errorText={errors.nombreReceta?.message}
                onChangeText={(nombreReceta) => onChange(nombreReceta)}
                value={nombreReceta}
                placeholder="Nombre"
            />
        )}
        />
      <Button onPress={handleSubmit(onSubmit)} label="Enviar" />

    </View>
  );
}

const styles = StyleSheet.create({
    container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
    olvidoPass: {textAlign: 'center', color: "#FFFFFF", marginBottom: 40, fontSize: 20}
  
  });