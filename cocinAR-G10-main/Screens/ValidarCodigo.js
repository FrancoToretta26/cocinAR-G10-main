import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Separator from '../Components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import Display from '../Utils/Display';

const VerificationScreen = ({
  route: {
  },
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Ingresa tu código</Text>
      </View>
      <Text style={styles.title}>Ingresa el 
      <Text style={styles.title2}> código de cuatro digitos 
      <Text style={styles.title}> que se
       </Text></Text> </Text>
       <Text style={styles.title3}> envió a tu
      <Text style={styles.title4}> correo electrónico
      </Text></Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => console.log(otp)}>
        <Text style={styles.signinButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 27,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: '#FAFAFA',
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 35,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    color: '#979C9E',
  },
  title2: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#F7456A',
    fontWeight: "bold",
    alignItems: 'center',
  },
  title3: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 1 * 1.4,
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 65,
    textalign: 'center',
    color: '#979C9E',
  },
  title4: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#F7456A',
    fontWeight: "bold",
    textalign: 'center'
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 30,
    borderColor: "#F7456A",
    borderWidth: 2.5,
  },
  otpText: {
    fontSize: 25,
    color: '#FAFAFA',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: '#F7456A',
    borderRadius: 30,
    marginHorizontal: 70,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 21,
    lineHeight: 18 * 1.4,
    color: "#FAFAFA",
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default VerificationScreen;