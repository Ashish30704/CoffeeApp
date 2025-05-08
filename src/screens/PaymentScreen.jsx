import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  smallIconDim,
  windowWidth,
  topMargin,
  horizonPadding,
} from '../utils/dimensions';
import {fonts, sizes} from '../utils/texts';
import colors from '../utils/colors';
import TopBar from '../components/TopBar';
import PaymentButtom from '../components/PaymentButtom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCartItems, setCartEmpty } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';

const PaymentScreen = ({route}) => {
  const [payWith, setPayWith] = useState('Pay');
  const {Price, address} = route.params;
  const navigation = useNavigation();

  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch();

  const handlePayButton = () => {
    uploadOrderData({
      data: cartItems,
      orderDate: new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: 'numeric',
        second: '2-digit',
      }).format(new Date()),
      orderPrice: Price,
      orderAddress: address
    })
    dispatch(deleteCartItems());
    // dispatch(setCartEmpty())
    Alert.alert('Payment Successful!')
    navigation.goBack()
  }

  const uploadOrderData = async(dataObj) => {
    try {
      const auth = getAuth()
      const uid = auth.currentUser.uid
      let data = []
      const hello = await firestore().collection('Orders').doc(uid).get()
      if(hello.exists) {
        if(Array.isArray(hello.data().data))
        data = hello.data().data
      }
      data.push(dataObj)
      await firestore().collection("Orders").doc(uid).set({data}, {merge: true})
      
      console.log("order Stored Succefully in firestore");      
    } catch(e) {
      console.error(e.message, e);
    }
  }

  return (
    <View style={styles.mainView}>
      <TopBar />
      <StatusBar backgroundColor={'transparent'} translucent />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{gap: 15}}>
          <TouchableOpacity style={styles.creditView} onPress={()=> setPayWith("Pay with Credit Card")}>
            <Text style={styles.creditText}>Credit Card</Text>
            <Image
              source={require('../../assets/images/creditCard.png')}
              style={styles.creditImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherPay} onPress={()=> setPayWith("Pay from Wallet")}>
            <Image
              source={require('../../assets/icons/wallet.png')}
              style={[{tintColor: colors.color2}, styles.payIcon]}
            />
            <Text style={styles.otherPaytext}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherPay} onPress={()=> setPayWith("Pay with GPay")}>
            <Image
              source={require('../../assets/icons/GooglePay.png')}
              style={styles.payIcon}
            />
            <Text style={styles.otherPaytext}>Google Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherPay} onPress={()=> setPayWith("Pay with Apple Pay")}>
            <Image
              source={require('../../assets/icons/applePay.png')}
              style={styles.payIcon}
            />
            <Text style={styles.otherPaytext}>Apple Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherPay} onPress={()=> setPayWith("Pay with Amazon Pay")}>
            <Image
              source={require('../../assets/icons/amazonPay.png')}
              style={styles.payIcon}
            />
            <Text style={styles.otherPaytext}>Amazon Pay</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 50,
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: 0,
          }}></View>
      </ScrollView>
      <PaymentButtom price={Price} paywith={payWith} handlePayAddButton={()=> handlePayButton()}/>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingHorizontal: horizonPadding(1.5),
  },
  scrollView: {
    marginTop: smallIconDim(7, 5).height,
  },
  creditView: {
    borderColor: colors.color2,
    borderWidth: 2,
    borderRadius: 25,
    padding: horizonPadding(1),
  },
  creditText: {
    fontSize: sizes.size2,
    color: colors.color7,
    fontFamily: fonts,
    fontWeight: '700',
  },
  creditImage: {
    // backgroundColor: 'red',
    alignSelf: 'center',
    width: smallIconDim(19, 1).height,
    height: smallIconDim(11, 1).height,
  },
  otherPay: {
    backgroundColor: colors.color4,
    flex: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    height: smallIconDim(3.5, 3).height,
    flexDirection: 'row',
  },
  payIcon: {
    alignSelf: 'center',
  },
  otherPaytext: {
    color: colors.color7,
    fontSize: sizes.size4,
    position: 'absolute',
    alignSelf: 'center',
    left: horizonPadding(4),
    fontFamily: fonts,
    fontWeight: 700,
  },
});
