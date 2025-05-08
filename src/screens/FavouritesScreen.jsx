import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../utils/colors';
import {horizonPadding, smallIconDim, windowHeight} from '../utils/dimensions';
import TopBar from '../components/TopBar';

// for practicing redux
import {useSelector, useDispatch} from 'react-redux';
import FauriteItem from '../components/FauriteItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesScreen = () => {
  const dispatch= useDispatch()
  const favItems = useSelector(state => state.favourite.favItems);
  const favEmpty = useSelector(state => state.favourite.favEmpty);
useEffect(()=>{
  console.log(favItems, "---======------");
  
  // setData(favItems||[])
},[dispatch])

const setData = async (value) => {
  console.log(value);
  try {
      const jasonValue = JSON.stringify(favItems);
      console.log(jasonValue)
      await AsyncStorage.setItem('favItemss', jasonValue)
  } catch(e) {
      Alert.alert('Item not saved!')
  }
}



  return (
    <View style={styles.mainView}>
      <TopBar />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          favEmpty
            ? {alignItems: 'center', justifyContent: 'center', flex: 1}
            : ''
        }>
          {favEmpty ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', fontSize: 20}}> There are no Favourites! </Text>
            </View>
          ) : (
        <View style={{gap: 25, paddingVertical: 10}}>
          {favItems.map((item, index) => (
            <FauriteItem
              key={item.id}
              itemId={item.id}
              itemName={item.name}
              itemIngredient={item.ingredient}
              itemDes={item.description}
              itemRating={item.rating}
              itemRatCount={item.ratCount}
              itemSource={item.image}
              itemRoasted={item.roasted}
              itemIngredient_0={item.ingredient_0}
              itemType={item.type}
            />
          ))}
        </View>
          )}
      </ScrollView>
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingVertical: horizonPadding(0),
    // paddingHorizontal: horizonPadding(1),
  },
  scrollView: {
    paddingHorizontal: horizonPadding(1.5),
    marginTop: smallIconDim(7, 5).height,
    flex: 1,
    // flexDirection: 'row'
  },
});
