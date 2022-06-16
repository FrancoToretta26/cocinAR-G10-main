import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

import ImagePicker from '../Components/ImagePicker';


export default function Registro({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();






  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    navigation.navigate('Inicio')
  };



  return (
    <View style={styles.container}>
        <ImagePicker></ImagePicker>
        <Controller
        defaultValue=""
        name="name"
        rules={{required:{
            value: true,
            message: 'Nombre'
        },
    }}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.name}
                errorText={errors.name?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
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
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.apellido}
                errorText={errors.apellido?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
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
                placeholder="Confirmar Contraseña"
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
  TyC: {textAlign: 'center', color: "#F7456A"},
});