import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/colors';
import {sizes} from '../utils/texts';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { topMargin } from '../utils/dimensions';

const AddressScreen = ({navigation}) => {
  const setAddress = async data => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      let userAddresses = [];

      const hello = await firestore().collection('Addresses').doc(uid).get();
      if (hello.exists) {
        userAddresses = hello.data().userAddresses;
        console.log('data exists');
      }
      if(userAddresses.length <= 5) {
        userAddresses.push(data);
        await firestore()
        .collection('Addresses')
        .doc(uid)
        .set({userAddresses}, {merge: true});
        
        handleSetAddress(data)
        console.log('address saved');
      } else {
        console.error("Limit of addresses Reached")
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  const handleSetAddress = async data => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      await firestore()
        .collection('users')
        .doc(uid)
        .set({address: data}, {merge: true});
    } catch (e) {
      console.log(e.message);
    }
  };

  // const dispatch = useDispatch();

  const auth = getAuth();
  const user = auth.currentUser;

  const [data, setData] = useState({
    name: '',
    number: '',
    pincode: '',
    city: '',
    state: '',
    locality: '',
    address: '',
  });

  const handleSubmit = () => {
    if (!user) {
      Alert.alert('User not found. Please login again.');
      return;
    }

    const emptyFields = Object.values(data).some(value => value.trim() === '');
    if (emptyFields) {
      Alert.alert('Please fill all fields!');
      return;
    }

    // dispatch(addAddress({ number: data.number, address: data }));
    setAddress(data);
    // addUserAddress_inFirestore(data)
    Alert.alert('Address Saved!');
    navigation.goBack()
  };

  const handleChange = (key, value) => {
    setData(prev => ({...prev, [key]: value}));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{marginTop: topMargin(3)}} showsVerticalScrollIndicator={false}>

      {Object.keys(data).map((field, i) => (
        <TextInput
        key={i}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          placeholderTextColor={colors.color6}
          color={'white'}
          value={data[field]}
          onChangeText={text => handleChange(field, text)}
          style={styles.input}
          keyboardType={
            field === 'number' || field === 'pincode' ? 'numeric' : 'default'
          }
        />
      ))}
        </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color3,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.color4,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: sizes.size2,
    color: 'white',
  },
  button: {
    backgroundColor: colors.color2,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.color7,
    fontSize: sizes.size2,
    textAlign: 'center',
  },
});
