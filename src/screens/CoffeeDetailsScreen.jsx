import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  horizonPadding,
  topMargin,
  windowHeight,
  windowWidth,
  smallIconDim,
} from '../utils/dimensions';
import colors from '../utils/colors';
import {sizes, fonts} from '../utils/texts';
import {useNavigation} from '@react-navigation/native';
import PaymentButtom from '../components/PaymentButtom';
import {useSelector, useDispatch} from 'react-redux';
import {setCartNotEmpty, setCartItem} from '../redux/slices/cartSlice';
import {addToFavItems} from '../redux/slices/favouriteSlice';
import PlaySound from '../utils/playSound';

const CoffeeDetailsScreen = ({route}) => {
  const dispatch = useDispatch();

  const {
    itemId,
    itemName,
    itemPrice,
    itemDes,
    itemIngredient,
    itemSource,
    itemSize,
    itemRating,
    itemRoasted,
    itemRatCount,
    itemIngredient_0,
    itemType,
  } = route.params;
  const [lessText, setLessText] = useState(true);
  const [selectedSize, setSelectedSize] = useState({
    price: itemPrice,
    size: itemSize[0].size,
  });

  const handleSizePrice = (t, u) => setSelectedSize({price: t, size: u});

  const textShowMethod = () => {
    setLessText(!lessText);
  };

  const handleAddtoCart = () => {
    dispatch(setCartNotEmpty());
    dispatch(
      setCartItem({
        id: itemId,
        name: itemName,
        image: itemSource,
        sizes: [
          {size: selectedSize.size, quantity: 1, price: selectedSize.price},
        ],
        description: itemDes,
        roasted: itemRoasted,
        ingredient: itemIngredient,
      }),
    );
  };

  const [isInCart, setIsInCart] = useState(null);
  const cartItems = useSelector(state => state.cart.cartItems);
  useEffect(() => {
    setIsInCart(cartItems.some(item => item.id === itemId));
  }, [itemId, cartItems]);

  const [isFavorite, setIsFavorite] = useState();
  const favItems = useSelector(state => state.favourite.favItems);
  useEffect(() => {
    setIsFavorite(favItems.some(item => item.id === itemId));
  }, [itemId, favItems]);

  const handleFavourite = () => {
    dispatch(
      addToFavItems({
        id: itemId,
        name: itemName,
        image: itemSource,
        description: itemDes,
        roasted: itemRoasted,
        ingredient: itemIngredient,
        ingredient_0: itemIngredient_0,
        rating: itemRating,
        ratCount: itemRatCount,
        type: itemType,
      }),
    );
  };

  const showText = lessText ? itemDes.substring(0, 100) + '...' : itemDes;

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: colors.color3}}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ScrollView
        style={{flex: 1, marginBottom: smallIconDim(5, 5).height}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground source={itemSource} style={styles.mainImage}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.topButtonView}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={{
                  height: smallIconDim(1, 1).height,
                  width: smallIconDim(0.6, 0.6).width,
                }}
              />
            </TouchableOpacity>
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
                <View>
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
                  <Image source={require('../../assets/icons/beans.png')} />
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
              <View
                style={[styles.propView, {width: smallIconDim(4, 8).width}]}>
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
          <View style={{gap: 15, marginBottom: topMargin(2)}}>
            <Text style={styles.descriptionStyle}>Size</Text>
            <View style={{flexDirection: 'row', gap: 15}}>
              {itemSize.map((Bsizes, index) => (
                <TouchableOpacity
                  key={Bsizes.size}
                  onPress={() =>
                    handleSizePrice(itemSize[index].price, itemSize[index].size)
                  }
                  style={[
                    styles.sizeButt,
                    selectedSize.size == Bsizes.size
                      ? {borderColor: colors.color2}
                      : {borderColor: colors.color5},
                  ]}>
                  <Text style={styles.sizeText}> {Bsizes.size} </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      {isInCart === true && (
        <View
          style={{
            position: 'absolute',
            right: horizonPadding(1),
            bottom: smallIconDim(4.5, 4).height,
            height: smallIconDim(2.5, 3).height,
            backgroundColor: colors.color4,
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: horizonPadding(1),
            gap: 10,
            borderWidth: 1,
            borderColor: colors.color2
          }}>
          <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
            <Text style={[styles.sizeText, {color: colors.color7}]}>Item Added! Go To Cart!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsInCart(false)}>
            <Image source={require('../../assets/icons/cross.png')} style={{tintColor: colors.color2,}} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{paddingHorizontal: horizonPadding(1)}}>
        <PaymentButtom
          price={selectedSize.price}
          handlePayAddButton={() => {
            handleAddtoCart();
            PlaySound(require('../assets/sounds/cool.mp3'))
          }}
        />
      </View>
    </View>
  );
};

export default CoffeeDetailsScreen;

const styles = StyleSheet.create({
  mainImage: {
    height: windowHeight * 0.6,
    width: windowWidth,
    justifyContent: 'space-between',
  },
  topButtons: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizonPadding(2),
    marginTop: topMargin(4),
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: topMargin(1),
    paddingRight: 10,
  },
  mainHeading: {
    fontSize: sizes.size1 - 2,
    color: colors.color7,
    fontWeight: '700',
    fontFamily: fonts,
  },
  container: {
    paddingHorizontal: horizonPadding(1.5),
    paddingVertical: horizonPadding(1),
    flexDirection: 'column',
    gap: 15,
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
