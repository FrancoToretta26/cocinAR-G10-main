import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, Pressable } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import Modal from "react-native-modal";
import { Image } from 'react-native-elements/dist/image/Image';
import Input from '../Components/Input'
import Button2 from '../Components/Button';

import { useForm, Controller } from 'react-hook-form';


export default function Registro({ navigation, route }) {
  const [isBillingDifferent, setIsBillingDifferent] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm();

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const toggleBilling = () => {
    setIsBillingDifferent((prev) => !prev);
  };

  const onSubmit = (data) => {
    setModalVisible3(!isModalVisible3);
    //navigation.navigate('ValidarCodigo')
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
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
      <Modal style={styles.modal}isVisible={isModalVisible}>
      <View style={styles.modalcontainer} >
          <Image style={styles.imagestyle} source={{
          uri: 'https://i.postimg.cc/cCBqF1TR/istockphoto-1181209880-612x612.jpg',
        }}></Image>
          <Text style={styles.ModalText}> El Alias ingresado ya existe.</Text>
          </View>
          <View>
          <Pressable style={styles.button} onPress={toggleModal}>
      <Text style={styles.modalbuttontext}>Volver</Text>
    </Pressable>
    </View>
      </Modal>
      <Modal style={styles.modal}isVisible={isModalVisible2}>
      <View style={styles.modalcontainer} >
          <Image style={styles.imagestyle} source={{
          uri: 'https://i.postimg.cc/43cxCxkD/57-Confused-Quotes-About-The-Ups-and-Downs-of-Life.jpg',
        }}></Image>
          <Text style={styles.ModalTextm2}> El correo electrónico ingresado ya existe</Text>
          </View>
          <Pressable style={styles.button2} onPress={toggleModal2}>
      <Text style={styles.modalbuttontext}>Recuperar Contraseña</Text>
    </Pressable>
    <Pressable style={styles.modalbuttonback} onPress={toggleModal2}>
      <Text style={styles.modalbuttonbacktext}>Volver</Text>
    </Pressable>
    </Modal>
    <Modal style={styles.modal}isVisible={isModalVisible3}>
      <View style={styles.modalcontainer} >
          <Image style={styles.imagestyle} source={{
          uri: 'https://i.postimg.cc/NjzyT0wV/Mx-Headerbild-1860x550-180924-Help-Desk.png',
        }}></Image>
          <Text style={styles.ModalTextm2}> No se puede completar el registro. Por favor envia un correo electrónico a soporte@cocinar.com</Text>
          </View>
          <Pressable style={styles.button3} onPress={toggleModal3}>
      <Text style={styles.modalbuttontext}>Volver</Text>
    </Pressable>
    </Modal>
    </View>
      <Button2 onPress={handleSubmit(onSubmit)} label="Registrarse"/>

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
    backgroundColor: '#222121',
  },
  modal: {
    height: 10,
    width: 350,
    marginTop: 100,
    marginBottom: 100,
    marginHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#222121',
    borderRadius: 30
  },
  imagestyle: {
    width: 345,
    height: 250,
    borderRadius: 20
  },
  ModalText: {
    fontSize: 25,
    lineHeight: 20 * 1.4,
    marginTop: 80,
    marginBottom: 0,
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#FFFFFFFF',
    backgroundColor: '#222121',
    fontWeight: "bold",
  },
  ModalTextm2: {
    fontSize: 25,
    lineHeight: 20 * 1.4,
    marginTop: 30,
    marginBottom: 0,
    marginHorizontal: 10,
    textAlign: 'center',
    color: '#FFFFFFFF',
    backgroundColor: '#222121',
    fontWeight: "bold",
  },
  ModalText2: {
    fontSize: 25,
    lineHeight: 20 * 1.4,
    marginTop: 6,
    marginBottom: 0,
    marginHorizontal: 80,
    textAlign: 'center',
    color: '#FFFFFFFF',
    backgroundColor: '#222121',
    fontWeight: "bold",
  },
  modalButton: {
    width:10,
    color: '#F7456A',
    borderRadius: 30,
    marginHorizontal: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 135,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#F7456A',
  },

  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#F7456A',
  },

  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 57,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#F7456A',
  },

  modalcontainer:{
    marginBottom: 30,
  },

  modalbuttontext:{
    color:'#FFFFFF',
    fontWeight: "bold",
    fontSize: 20,
  },

  modalbuttonback: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 66,
    backgroundColor: '#222121',
  },

  modalbuttonbacktext:{
    color:'#6C7072',
    fontSize: 20,
  }

});