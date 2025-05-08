import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {horizonPadding, smallIconDim} from '../utils/dimensions';
import colors from '../utils/colors';
import BuyCoffee1 from '../components/BuyCoffee1';
import BuyCoffee2 from '../components/BuyCoffee2';
import TopBar from '../components/TopBar';
import PaymentButtom from '../components/PaymentButtom';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AddressModal from '../components/AddressModal';

const CartScreen = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const cartEmpty = useSelector(state => state.cart.cartEmpty);
  const cartItems = useSelector(state => state.cart.cartItems);

    useEffect(() => {
      const loadAddress = async () => {
        try {
          const auth = getAuth();
          const data = await firestore()
            .collection('users')
            .doc(auth.currentUser.uid)
            .get();
          if (data.exists && userAddress !== data.data().address) {
            setUserAddress(data.data().address);
          }
        } catch (error) {
          Alert.alert('Failed to load address!', error.message);
        }
      };
      loadAddress();
    }, [modalVisible, userAddress])

  let totalPrice = 0;
  if (cartItems) {
    cartItems.forEach(item => {
      item.sizes.forEach(size => {
        totalPrice += size.price * size.quantity;
      });
    });
    totalPrice = parseFloat(totalPrice.toFixed(2));
  }

  const handlePayButton = () => {
    if (userAddress) {
      navigation.navigate('Payment', {Price: totalPrice, address: userAddress});
    } else {
      navigation.navigate('AddressScreen');
    }
  };

  return (
    <View style={styles.mainView}>
      <TopBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          cartEmpty
            ? {alignItems: 'center', justifyContent: 'center', flex: 1}
            : ''
        }
        showsVerticalScrollIndicator={false}>
        {/* Cart Items */}

        <Modal
          animationType="slide"
          backdropColor={'transparent'}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <AddressModal
            setModalVisible={setModalVisible}
            currentAddress={userAddress}
          />
        </Modal>
        <View style={{paddingTop: smallIconDim(1, 5).height}}>
          {cartEmpty ? (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/icons/bag.png')}
                style={{height: 20, width: 17, tintColor: colors.color2}}
              />
              <Text style={{color: 'white', fontSize: 20}}> Cart is empty</Text>
            </View>
          ) : (
            <View style={{gap: 20}}>
              {/*Address Section*/}
              <View
                style={{
                  marginTop: smallIconDim(1, 5).height,
                  marginBottom: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: colors.color7,
                      fontSize: 16,
                      fontWeight: 600,
                    }}>
                    Delivery Address:
                  </Text>
                  {userAddress ? (
                    <Text style={{color: colors.color7, marginTop: 5}}>
                      {userAddress.address}, {userAddress.city},{' '}
                      {userAddress.state}
                    </Text>
                  ) : (
                    <View style={{marginTop: 5}}>
                      <Text style={{color: colors.color7}}>
                        No address found.
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('AddressScreen')}>
                        <Text style={{color: colors.color2, fontWeight: 500}}>
                          + Add Address
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text style={{color: colors.color2, fontWeight: 500}}>
                    Change Address
                  </Text>
                </TouchableOpacity>
              </View>
              {cartItems.map((item, index) =>
                item.sizes.length === 1 ? (
                  <BuyCoffee2
                    key={item.id}
                    itemId={item.id}
                    itemName={item.name}
                    itemIngredient={item.ingredient}
                    itemSource={item.image}
                    itemSize={item.sizes[0].size}
                    itemPrice={item.sizes[0].price}
                    itemQuantity={item.sizes[0].quantity}
                  />
                ) : (
                  <BuyCoffee1
                    key={item.id}
                    itemId={item.id}
                    itemName={item.name}
                    itemIngredient={item.ingredient}
                    itemSource={item.image}
                    itemSize={item.sizes}
                    itemRoasted={item.roasted}
                  />
                ),
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {!cartEmpty && (
        <PaymentButtom
          price={totalPrice}
          handlePayAddButton={() => handlePayButton()}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingHorizontal: horizonPadding(1.5),
  },
  scrollView: {
    marginTop: smallIconDim(5, 5).height,
    marginBottom: smallIconDim(5, 5).height,
  },
});
