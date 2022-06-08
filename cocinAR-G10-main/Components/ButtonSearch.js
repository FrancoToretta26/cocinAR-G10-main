import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function Button({ label, ...props }) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={styles.button}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: [t.selfStretch, t.bgGreen600,{backgroundColor:"#9ba6a6"}, {marginTop: 20}, t.itemsCenter, t.pY3, t.rounded],
  buttonLabel: [t.textBlack, t.textLg]
  
})

