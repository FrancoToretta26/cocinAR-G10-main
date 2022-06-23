import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import Modal from "react-native-modal";
import { Image } from 'react-native-elements/dist/image/Image';
import Input from '../Components/Input'
import Button from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default function Registro({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    setModalVisible(!isModalVisible);
    //navigation.navigate('ValidarCodigo')
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
        <Controller
        defaultValue=""
        name="name"
        rules={{required:{
            value: true,
            message: 'Alias es requerido'
        },
    }}
        control={control}
        render={({ field: { onChange, value } }) => (
            <Input
                error={errors.name}
                errorText={errors.name?.message}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Alias"
            />
        )}
        />
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
        <Text style={styles.TyC}>Continuando, aceptas los terminos y condiciones del servicio y politicas de privacidad</Text>
        <View>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal style={styles.modal}isVisible={isModalVisible}>
        <View>
          <Text> Hello!</Text>
          <Image source={{uri:'https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg'}}></Image>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
      <Button onPress={handleSubmit(onSubmit)} label="Registrarse"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: [t.flex1, t.justifyCenter, t.itemsCenter, t.p6, {backgroundColor: "#222121"}],
  TyC: {textAlign: 'center', color: "#F7456A"},

  title: {
    fontSize: 18,
    lineHeight: 20 * 1.4,
    marginTop: 35,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    color: '#979C9E',
    backgroundColor: '#FAFAFA',
  },
  modal: {
    fontSize: 18,
    lineHeight: 20 * 1.4,
    marginTop: 35,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    color: '#979C9E',
    backgroundColor: '#FAFAFA',
  },
});