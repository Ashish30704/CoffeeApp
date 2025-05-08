import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {sizes, fonts} from '../utils/texts';
import colors from '../utils/colors';
import {smallIconDim} from '../utils/dimensions';
import { useRoute } from '@react-navigation/native';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PaymentButtom = ({price, paywith, handlePayAddButton}) => {
    const [address, setAddress] = useState(false)
    useEffect(()=> {
      const checkAddress = async() => {
        const auth = getAuth()
        const data = await firestore().collection('users').doc(auth.currentUser.uid).get()
        if(data.exists) {
          if(data.data().address !== '') {
            setAddress(true)
          }
        }
      }
      checkAddress()
    }, [])

    const route = useRoute()
    const buttonText = {
        'Cart': address? 'Pay' : 'Add Address',
        "CoffeeDetailsScreen": "Add to Cart",
        "Order History": 'Pay',
        "Payment": paywith
    }
  return (
    <View>
      <View style={styles.paymentView}>
        <View style={styles.priceView}>
          <Text style={[styles.descriptionStyle, {fontSize: sizes.size5}]}>
            Price
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.mainHeading, {color: colors.color2}]}>${' '}</Text>
          <Text style={styles.mainHeading}>{price}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addtocartButt} onPress={() => handlePayAddButton()}>
          <Text style={styles.buttText}>{buttonText[route.name]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentButtom;

const styles = StyleSheet.create({
  paymentView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: colors.color3
    // height: smallIconDim(0, 4).height,
  },
  mainHeading: {
    fontSize: sizes.size1 - 2,
    color: colors.color7,
    fontWeight: '700',
    fontFamily: fonts,
  },
  priceView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionStyle: {
    color: colors.color6,
    fontFamily: fonts,
    fontWeight: 'bold',
    fontSize: sizes.size3,
  },
  addtocartButt: {
    flex: 1.75,
    backgroundColor: colors.color2,
    borderRadius: 20,
    height: smallIconDim(4, 2).height,
    justifyContent: 'center',
  },
  buttText: {
    color: colors.color7,
    alignSelf: 'center',
    fontSize: sizes.size2-2,
    fontWeight: '700',
  },
});
