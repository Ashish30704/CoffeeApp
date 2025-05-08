import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/colors';
import {smallIconDim, horizonPadding} from '../utils/dimensions';
import {fonts, sizes} from '../utils/texts';
import { useSelector, useDispatch } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity } from '../redux/slices/cartSlice';
import PlaySound from '../utils/playSound';
// import {styles} from './ShowCoffees';

const SelectSize = ({itemId, itemSize, itemPrice, itemQuantity}) => {
  const dispatch = useDispatch();
  // const Size = itemSize.size

  return (
    <View style={styles.mainView}>
      <View style={styles.cartSize}>
        <Text style={styles.cartSubHeading}>{itemSize}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', flex: 0.5}}>
        <Text style={{fontSize: sizes.size3, color: colors.color2}}>
          {'$ '}
        </Text>
        <Text style={{fontSize: sizes.size3, color: colors.color7}}>
          {itemPrice}
        </Text>
      </View>

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
        <Text style={styles.cartSubHeading}>{itemQuantity}</Text>
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
  );
};

export default SelectSize;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartSize: {
    backgroundColor: colors.color3,
    borderRadius: 10,
    flex: 0.7,
    height: smallIconDim(2.5, 5).height,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: horizonPadding(1),
  },
  cartSubHeading: {
    fontFamily: fonts,
    color: colors.color7,
    fontSize: sizes.size3,
    fontWeight: '700',
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
