import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  horizonPadding,
  topMargin,
  windowHeight,
  windowWidth,
  smallIconDim,
} from '../utils/dimensions';
import colors from '../utils/colors';
import {sizes, fonts} from '../utils/texts';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addToFavItems } from '../redux/slices/favouriteSlice';

const FauriteItem = ({itemId, itemDes, itemType, itemRoasted, itemRatCount, itemRating, itemName, itemIngredient, itemIngredient_0, itemSource}) => {
  const dispatch = useDispatch();
  const [lessText, setLessText] = useState(true);
  
  const [isFavorite, setIsFavorite] = useState();
  const favItems = useSelector(state => state.favourite.favItems)
  useEffect(() => {
    setIsFavorite(favItems.some(item => item.id === itemId))
  }, [itemId, favItems])
  const handleFavourite = () => {
      dispatch(addToFavItems({
        id: itemId,
        name: itemName,
        image: itemSource,
        description: itemDes,
        roasted: itemRoasted,
        ingredient: itemIngredient,
        ingredient_0: itemIngredient_0,
        rating: itemRating,
        ratCount: itemRatCount,
        type: itemType
      }))
    }

  const textShowMethod = () => {
    setLessText(!lessText);
  };
  const showText = lessText ? itemDes.substring(0, 100) + '...' : itemDes;
  return (
    <View style={{flex: 1, overflow: 'hidden', borderRadius: 30,}}>
      <ImageBackground source={itemSource} style={styles.mainImage}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.topButtonView}
            onPress={() => handleFavourite()}>
            <Image
              source={require('../../assets/icons/heart.png')}
              style={{
                height: smallIconDim(0.9, 0.9).height,
                width: smallIconDim(1, 1).width,
                tintColor: isFavorite ? 'red' : 'white',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemDetails}>
          <View style={styles.itemInfo}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View style={{}}>
                <Text style={styles.mainHeading}>{itemName}</Text>
                <Text style={{color: colors.color6, fontWeight: '500'}}>
                  {itemIngredient}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: topMargin(0.5),
                }}>
                <Image
                  source={require('../../assets/icons/star.png')}
                  style={{tintColor: colors.color2}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: sizes.size2,
                    fontWeight: 600,
                  }}>
                  {itemRating}
                </Text>
                <Text style={{color: colors.color6, fontSize: sizes.size4}}>
                  ({itemRatCount})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemProps}>
            <View style={{flexDirection: 'row', gap: topMargin(1)}}>
              <View style={styles.propView}>
                <Image style={{tintColor: 'brown'}} source={require('../../assets/icons/beans.png')} />
                <Text style={{color: colors.color6, fontSize: sizes.size5}}>
                  {itemType}
                </Text>
              </View>
              <View style={styles.propView}>
                <Image source={require('../../assets/icons/drop.png')} />
                <Text style={{color: colors.color6, fontSize: sizes.size5}}>
                  {itemIngredient_0}
                </Text>
              </View>
            </View>
            <View style={[styles.propView, {width: smallIconDim(4, 8).width}]}>
              <Text style={{color: colors.color6, fontSize: sizes.size5}}>
                {itemRoasted}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <Text style={styles.descriptionStyle}>Description</Text>
        <Text
          style={[
            styles.descriptionStyle,
            {fontWeight: '600', fontSize: sizes.size4},
          ]}>
          {showText}
          <Text style={{fontWeight: 700}} onPress={() => textShowMethod()}>
            {' '}
            {lessText ? 'show more' : 'show less'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default FauriteItem;

const styles = StyleSheet.create({
  mainImage: {
    height: windowHeight * 0.6,
    justifyContent: 'space-between',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: horizonPadding(1.5),
    marginTop: topMargin(1.5),
  },
  topButtonView: {
    backgroundColor: colors.color4,
    height: smallIconDim(2.5, 2).height,
    width: smallIconDim(2, 2.5).width,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  itemDetails: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'row',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: smallIconDim(9.5, 10).height,
    paddingHorizontal: horizonPadding(1.5),
  },
  itemInfo: {
    flexDirection: 'column',
    paddingVertical: topMargin(1.7),
  },
  itemProps: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: topMargin(1),
    // justifyContent: 'space-between',
  },
  mainHeading: {
    fontSize: sizes.size1 - 7,
    color: colors.color7,
    fontWeight: '700',
    fontFamily: fonts,
  },
  container: {
    paddingHorizontal: horizonPadding(1.5),
    paddingVertical: horizonPadding(1),
    flexDirection: 'column',
    gap: 15,
    backgroundColor: colors.color4
  },
  descriptionStyle: {
    color: colors.color6,
    fontFamily: fonts,
    fontWeight: 'bold',
    fontSize: sizes.size3,
  },
  sizeButt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color4,
    height: smallIconDim(3, 3).height,
    borderRadius: 12,
    borderWidth: 2,
  },
  sizeText: {
    color: colors.color6,
    fontWeight: '500',
    fontSize: sizes.size3,
  },
  propView: {
    height: smallIconDim(3.5, 3).height,
    width: smallIconDim(3, 3.5).width,
    backgroundColor: colors.color4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // alignSelf: 'baseline'
  },
});
