import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sizes} from '../utils/texts';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {horizonPadding, topMargin, smallIconDim} from '../utils/dimensions';
import colors from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

const AddressModal = ({setModalVisible, currentAddress}) => {
  const navigation = useNavigation();
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAdd, setSelectedAdd] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, [selectedAdd]);
  const loadAddresses = async () => {
    try {
      const auth = getAuth();
      const addresses = await firestore()
        .collection('Addresses')
        .doc(auth.currentUser.uid)
        .get();
      if (addresses.exists) {
        const fetchedAdd = addresses.data().userAddresses;
        setUserAddresses(fetchedAdd);

        const index = fetchedAdd.findIndex(item =>
          isSameAddress(item, currentAddress),
        );
        setSelectedAdd(index);
      } else {
        console.error('address do not exist');
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const isSameAddress = (a, b) => {
    return (
      a.number === b.number &&
      a.address === b.address &&
      a.locality === b.locality &&
      a.city === b.city
    );
  };

  const handleSetAddress = async index => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      await firestore()
        .collection('users')
        .doc(uid)
        .set({address: userAddresses[index]}, {merge: true});
      setModalVisible(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteAddress = async index => {
    try {
      const auth = getAuth()
      const uid = auth.currentUser.uid

      const doc = await firestore().collection('Addresses').doc(uid).get()
      if(doc.exists) {
        let address = doc.data().userAddresses
        address = address.filter(item => !isSameAddress(item, userAddresses[index]))
        await firestore().collection('Addresses').doc(uid).set({
          userAddresses: address
        }, {merge: true})

        setSelectedAdd(0)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <View style={styles.modalView}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Image
            source={require('../../assets/icons/cross.png')}
            style={{tintColor: colors.color2}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('AddressScreen');
          }}
          style={styles.deleteButton}>
          <Text
            style={{
              color: colors.color2,
              fontSize: sizes.size3,
              fontWeight: 600,
            }}>
            Add New Address +
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Select any Address-</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{gap: 10}}>
          {userAddresses.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={[
                  styles.addressComp,
                  {
                    borderColor:
                      index === selectedAdd ? colors.color2 : colors.color3,
                  },
                ]}
                onPress={() => setSelectedAdd(index)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.addressInfo}>
                    {item.number},{'\n'}
                    {item.address}, {item.locality}, {item.city}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => {
            if (selectedAdd !== null) {
              handleDeleteAddress(selectedAdd);
            } else {
              console.error('address not selected');
            }
          }}
          style={styles.deleteButton}>
          <Text
            style={{
              color: colors.color2,
              fontSize: sizes.size3,
              fontWeight: 600,
            }}>
            Delete Address
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selectedAdd !== null) {
              handleSetAddress(selectedAdd);
            } else {
              console.error('address not selected');
            }
          }}
          style={styles.deleteButton}>
          <Text
            style={{
              color: colors.color2,
              fontSize: sizes.size3,
              fontWeight: 600,
            }}>
            Set Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.color3,
    justifyContent: 'center',
    width: '85%',
    top: topMargin(5),
    borderRadius: 20,
    padding: horizonPadding(2),
    borderWidth: 1,
    borderColor: colors.color6,
    alignSelf: 'center',
  },
  scrollView: {
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    fontSize: sizes.size2,
    fontWeight: 500,
    marginVertical: topMargin(1),
  },
  addressComp: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.color4,
    padding: horizonPadding(1),
    // justifyContent: 'center'
  },
  addressInfo: {
    color: 'white',
    fontSize: sizes.size3,
  },
  deleteButton: {
    height: smallIconDim(2.5, 3).height,
    // backgroundColor: colors.color7,
    // borderRadius: 10,
    // alignItems: 'center',
    // padding: 5,
  },
});
