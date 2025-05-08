import {
  Button,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopBar from '../components/TopBar';
import {sizes} from '../utils/texts';
import colors from '../utils/colors';
import {horizonPadding, smallIconDim} from '../utils/dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {logOutUser, setUserImage} from '../redux/slices/loginSlice';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { clearAddress } from '../redux/slices/addressSlice';
import CoffeeData from '../utils/CoffeeData';

const UserDetails = () => {
  const dispatch = useDispatch();
  const userDefaultImage = useSelector(state => state.login.currentUserImage);
  const userImageSelected = useSelector(state => state.login.imageSelected);
  const [userName, setUserName] = useState('')
  const [userNumber, setUserNumber] = useState('')

  const fetchUserName = async() => {
    try{
      const auth = getAuth()
      const uid = auth.currentUser.uid
      const email = auth.currentUser.email
      const data = await firestore().collection('users').doc(uid).get()
      if(data.exists) {
        setUserNumber(data.data().number)
      } else {
        console.log('user do not exists')
      }
      setUserName(email)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(()=> {
    fetchUserName()
  },[])

  const requstPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access media',
          message: 'App need this permission lil bro',
          buttonPositive: 'Ok',
          buttonNegative: 'No',
          buttonNeutral: 'later',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async () => {
    const permission = await requstPermission();
    if (!permission) {
      console.log('Permission denied');
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker!');
        } else if (response.errorCode) {
          console.log('response error-', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          // setImageUri(uri);
          // dispatch(setUserImage(uri));
          storeUserImageAddress(uri)
        }
      },
    );
  };
  
  const storeUserImageAddress = async (uri) => {
    try {
      const auth = getAuth()
      const uid = auth.currentUser.uid
      await firestore().collection('users').doc(uid).update({
        imageUri: uri
      })
      console.log('image saved');

      dispatch(setUserImage(uri));     
    } catch (e) {
      console.log('image not saved', e.message);      
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.color4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: colors.color7,
      }}>
      <View style={{flexDirection: 'column', gap: 5}}>
        <Text
          style={{
            color: colors.color7,
            fontSize: sizes.size4,
            fontWeight: 500,
          }}>
          {userName}
        </Text>
        <Text
          style={{
            color: colors.color2,
            fontSize: sizes.size3,
            fontWeight: 500,
          }}>
          {userNumber? userNumber: 'Enter number in cart...'}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 40,
          height: smallIconDim(6, 2).height,
          width: smallIconDim(2, 6).width,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: colors.color2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => pickImage()}>
        <Image
          //   source={imageUri ? {uri: imageUri} : userDefImage}
          source={
            userDefaultImage !== ''
              ? {uri: userDefaultImage}
              : require('../../assets/images/userImage1.png')
          }
          style={{
            height: smallIconDim(5, 2).height,
            width: smallIconDim(2, 5).width,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const UserMethods = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
    dispatch(setUserImage(''))
    const auth = getAuth();
    auth.signOut;
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
            // params: { user: 'jane', key: route.params.key },
          },
        ],
      }),
    );
  };

  const handleClearAddress = () => {
    dispatch(clearAddress())
  }

  const uploadData = async(data) => {
    try {
      await firestore().collection('Products').doc('CoffeeData').set({data})      
      console.log("stored successfully")
    } catch (e) {
      console.log('there is a problem', e.message)
    }
  }
  const uploadAddress = async(data) => {
    try{
      const auth = getAuth()
      const uid = auth.currentUser.uid
      await firestore().collection('users').doc(uid).set({
        address: 'hello',
      }, {merge: true})
    } catch(e) {
      console.log(e.message)
    }
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.color4,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 1,
        borderColor: colors.color7,
      }}>
      <Button title="Log Out" onPress={() => handleLogOut()} />
      {/* <Button title="Clear Address" onPress={()=> handleClearAddress()} /> */}
      {/* <Button title='Upload Data' onPress={()=> uploadData(CoffeeData)} /> */}
      {/* <Button title={'Upload Address'} onPress={()=> uploadAddress()} /> */}
    </View>
  );
};

const UserInfoScreen = () => {
  return (
    <View style={styles.mainView}>
      <TopBar />
      <ScrollView style={styles.scrollView}>
        <UserDetails />
        <UserMethods />
      </ScrollView>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingHorizontal: horizonPadding(1.5),
  },
  scrollView: {
    marginTop: smallIconDim(7, 5).height,
  },
});
