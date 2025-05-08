import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  horizonPadding,
  windowHeight,
  windowWidth,
  smallIconDim,
} from '../utils/dimensions';
import colors from '../utils/colors';
import {fonts, sizes} from '../utils/texts';
import { useSelector, useDispatch } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity } from '../redux/slices/cartSlice';
import PlaySound from '../utils/playSound';

const BuyCoffee2 = ({itemId, itemName, itemPrice, itemIngredient, itemSource, itemSize, itemQuantity}) => {

  const dispatch = useDispatch();

  return (
    // <View>
      <View style={styles.cartItems}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Image source={itemSource} style={styles.cartImage} />
          <View
            style={{
              flexDirection: 'column',
              height: smallIconDim(8, 3).height,
              justifyContent: 'space-between',
              flex: 1,
              // gap: 5,
            }}>
            <View>
              <Text style={styles.cartHeading}>{itemName}</Text>
              <Text style={styles.cartSubHeading}>{itemIngredient}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
              <View style={styles.cartSize}>
                <Text style={[styles.cartHeading, {fontWeight: '700'}]}>
                  {/* {Coffees[0].size.large} */}
                  {/* {JSON.stringify(Coffees)} */}
                  {itemSize}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1.5,
                }}>
                <Text style={{fontSize: sizes.size2, color: colors.color2}}>
                  {'$ '}
                </Text>
                <Text style={{fontSize: sizes.size2, color: colors.color7}}>
                  {itemPrice}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={styles.addIconView}
                onPress={() => {
                  dispatch(decreaseItemQuantity({itemId, itemSize}))
                  PlaySound(require('../assets/sounds/click_a.mp3'))
                }}>
                <Image
                  style={styles.minusIcon}
                  source={require('../../assets/icons/minus.png')}
                />
              </TouchableOpacity>
              <View style={[styles.noItems]}>
                <Text style={styles.cartHeading}>{itemQuantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.addIconView}
                onPress={() => {
                  dispatch(increaseItemQuantity({itemId, itemSize}))
                  PlaySound(require('../assets/sounds/click_a.mp3'))
                }}>
                <Image
                  style={styles.addIcon}
                  source={require('../../assets/icons/plus.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </View> */}
      </View>
  );
};

export default BuyCoffee2;

const styles = StyleSheet.create({
  cartItems: {
    padding: horizonPadding(0.7),
    backgroundColor: colors.color4,
    borderRadius: 15,
    flexDirection: windowWidth > 500 ? 'row' : 'column',
    gap: 10,
  },
  cartImage: {
    height: smallIconDim(8.5, 3).height,
    width: smallIconDim(8.5, 3).height,
    borderRadius: 10,
  },
  cartHeading: {
    fontFamily: fonts,
    fontWeight: '500',
    color: colors.color7,
    fontSize: sizes.size3 - 1,
  },
  cartSubHeading: {
    fontFamily: fonts,
    color: colors.color6,
    fontSize: sizes.size5 - 1,
  },
  cartSize: {
    backgroundColor: colors.color3,
    borderRadius: 10,
    height: smallIconDim(2.5, 5).height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizonPadding(1),
  },
  addIcon: {
    flex: 0,
    height: 12,
    width: 12,
  },
  minusIcon: {
    flex: 0,
    height: 2,
    width: 12,
  },
  noItems: {
    borderColor: colors.color2,
    borderWidth: 1,
    height: smallIconDim(2, 5).height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 0.6,
    backgroundColor: colors.color3,
  },
  addIconView: {
    height: smallIconDim(1.7, 1.7).height,
    width: smallIconDim(1.7, 1.7).width,
    borderRadius: 7,
    backgroundColor: colors.color2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
