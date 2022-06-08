import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';

import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';


export default function OlvidePassword() {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log(data, 'data');
  };


  return (
    <View style={styles.container}>
        <Controller
        defaultValue=""
        name="email"
        rules={{required:{
            value: true,
            message: 'El correo electronico es requerido'
        },
        pattern:{
            value: EMAIL_REGEX,
            message: 'El correo electronico es invalido'
        }}}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.email}
                errorText={errors.email?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Correo Electrónico"
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