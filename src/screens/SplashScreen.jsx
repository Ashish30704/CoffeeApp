import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import { sizes } from '../utils/texts';
import { horizonPadding, topMargin, smallIconDim } from '../utils/dimensions';
import { useDispatch } from 'react-redux';
import { restoreLoginState } from '../redux/slices/loginSlice';


const SplashScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      getLogin();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getLogin = async () => {
    const loginStatus = await AsyncStorage.getItem('loginStatus');
    const currentUser = await AsyncStorage.getItem('currentUser');

    const isLoggedIn = JSON.parse(loginStatus);
    const current = JSON.parse(currentUser);

    if (isLoggedIn &&  current) {
      dispatch(restoreLoginState({
        isLoggedIn: loginStatus,
        currentUser: current,
      }));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabs'}]
        })
      )
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}]
        })
      )
    }
  };

  return (
    <View style={styles.mainView}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.logoRow}>
        <Image
          source={require('../../assets/icons/coffeeMug.png')}
          style={styles.logoIcon}
        />
        <Text style={styles.logoText}>Coffee Shop</Text>
      </View>
      <Text style={styles.tagline}>Brewed Happiness</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.color3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizonPadding(2),
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    height: smallIconDim(5, 2).height,
    width: smallIconDim(2, 5).width,
    tintColor: colors.color2,
  },
  logoText: {
    fontSize: sizes.size1 + 12,
    color: colors.color2,
    fontWeight: '700',
  },
  tagline: {
    fontSize: sizes.size2,
    color: colors.color7,
    marginTop: topMargin(1.5),
    fontWeight: '500',
  },
});
