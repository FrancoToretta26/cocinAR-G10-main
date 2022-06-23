import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';


export default function CargarReceta({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();



  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    navigation.navigate('RegistroReceta')
  };

    
  


  return (

    <View style={styles.container}>
        <Text style={styles.olvidoPass} onPress={() => navigation.navigate('OlvidePassword')}> Ingresar el nombre del plato</Text>
        <Controller
        defaultValue=""
        name="nombreReceta"
        rules={{required:{
            value: true,
            message: 'El Nombre es Obligatorio'
        },
    }}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.nombreReceta}
                errorText={errors.nombreReceta?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
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