import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  smallIconDim,
  windowWidth,
  topMargin,
  horizonPadding,
} from '../utils/dimensions';
import {fonts, sizes} from '../utils/texts';
import colors from '../utils/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const TopBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userDefaultImage = useSelector(state => state.login.currentUserImage);
  const userImageSelected = useSelector(state => state.login.imageSelected);
  const userImageClick = () => {
    navigation.navigate('User');
  };

  // const

  return (
    <View style={styles.topBar}>
      {route.name === 'Home' || route.name === 'User' ? (
        <TouchableOpacity style={[styles.smallIcon, styles.menuIcon]} onPress={()=> navigation.openDrawer()}>
          <Image source={require('../../assets/icons/menu.png')} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Text style={styles.mainHeading}>{route.name}</Text>
      <TouchableOpacity onPress={() => userImageClick()}>
        <Image
          source={
            userDefaultImage !== ''
              ? {uri: userDefaultImage}
              : require('../../assets/images/userImage1.png')
          }
          style={styles.smallIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.color3,
    height: smallIconDim(5, 10).height,
    width: windowWidth,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 1,
    paddingHorizontal: horizonPadding(1.5),
    marginTop: smallIconDim(2, 5).height,
  },
  smallIcon: {
    height: smallIconDim(2, 2).height,
    width: smallIconDim(2, 2).width,
    borderRadius: 5,
  },
  menuIcon: {
    backgroundColor: colors.color4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: sizes.size1,
    color: colors.color7,
    fontWeight: 'bold',
    fontFamily: fonts,
    // marginBottom: topMargin(1),
  },
});
