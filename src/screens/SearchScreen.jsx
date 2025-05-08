import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../utils/colors';
import {sizes, fonts} from '../utils/texts';
import {horizonPadding, topMargin, smallIconDim} from '../utils/dimensions';

const SearchScreen = () => {
    useEffect(()=> {
        
    },[])

    
  return (
    <View style={styles.mainView}>
      <StatusBar />
      <ScrollView style={styles.scrollView}></ScrollView>
    </View>
  );
};

export default SearchScreen;

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
