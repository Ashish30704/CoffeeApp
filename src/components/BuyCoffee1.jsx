import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {fonts, sizes} from '../utils/texts';
import {Coffees} from '../utils/myData';
import colors from '../utils/colors';
import {
  horizonPadding,
  smallIconDim,
  topMargin,
  windowWidth,
} from '../utils/dimensions';
import SelectSize from './SelectSize';

const BuyCoffee1 = ({
  itemId,
  itemName,
  itemIngredient,
  itemSource,
  itemSize,
  itemRoasted,
}) => {
  return (
    <View>
      <View style={styles.cartItems}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Image source={itemSource} style={styles.cartImage} />
          <View
            style={{
              flexDirection: 'column',
              height: smallIconDim(6, 3).height,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.cartHeading}>{itemName}</Text>
            <Text style={styles.cartSubHeading}>{itemIngredient}</Text>
            <View style={styles.cartSize}>
              <Text style={styles.cartSubHeading}>{itemRoasted}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          {itemSize.map((item, index) => (
            <SelectSize
              key={index}
              itemId={itemId}
              itemSize={item.size}
              itemPrice={item.price}
              itemQuantity={item.quantity}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default BuyCoffee1;

const styles = StyleSheet.create({
  cartItems: {
    padding: horizonPadding(0.7),
    backgroundColor: colors.color4,
    borderRadius: 15,
    flexDirection: windowWidth > 500 ? 'row' : 'column',
    gap: 10,
  },
  cartImage: {
    height: smallIconDim(6, 3).height,
    width: smallIconDim(6, 3).height,
    borderRadius: 10,
  },
  cartHeading: {
    fontFamily: fonts,
    fontWeight: '500',
    color: colors.color7,
    fontSize: sizes.size3,
  },
  cartSubHeading: {
    fontFamily: fonts,
    color: colors.color6,
    fontSize: sizes.size5,
  },
  cartSize: {
    backgroundColor: colors.color3,
    borderRadius: 10,
    height: smallIconDim(2.5, 5).height,
    // width: smallIconDim(5, 7).width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizonPadding(1),
  },
});
