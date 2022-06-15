import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

import IconLabel from './IconLabel';

const iconColor = '#F7456A';
const RecipeCard = ({ info }) => {
  const { name, author, rating, image } = info;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={image} />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.categoryStyle}>{author}</Text>

          <View style={styles.iconLabelStyle}>
            <IconLabel name="md-heart" color={iconColor}></IconLabel> 
            <Text style={styles.deliveryTime}>{rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 50,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#222121',
    height: 250,
  },
  imageStyle: {
    height: 180,
    width: deviceWidth - offset,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderRadius: 40,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    marginLeft: 70,
    fontSize: 20,
    fontWeight: '800',
    color: 'white'
  },
  categoryStyle: {
    marginLeft: 230,
    fontWeight: '400',
    color: "#F7456A"
  },
  infoStyle: {
    marginBottom: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    color: 'white'
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: -20,
    color: 'white'
  },
  deliveryTime:{
      color: 'white'
  }
});

export default RecipeCard;