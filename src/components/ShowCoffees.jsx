import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import colors from '../utils/colors';
import {fonts, sizes} from '../utils/texts';
import {smallIconDim, topMargin} from '../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCartNotEmpty, setCartItem} from '../redux/slices/cartSlice';
import {useRef} from 'react';
import PlaySound from '../utils/playSound';

const ShowCoffees = ({
  name,
  price,
  ingredient,
  source,
  id,
  des,
  size,
  rating,
  roasted,
  ratCount,
  ingredient_0,
  type,
  onAddToCartPress,
}) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const itemId = id;
  const itemName = name;
  const itemPrice = price;
  const itemIngredient = ingredient;
  const itemSource = source;
  const itemRoasted = roasted;
  const itemRating = rating;
  const itemDes = des;
  const itemSize = size;
  const itemRatCount = ratCount;
  const itemIngredient_0 = ingredient_0;
  const itemType = type;

  const addRef = useRef();

  const handleAddtoCart = () => {
    dispatch(setCartNotEmpty());
    dispatch(
      setCartItem({
        id: itemId,
        name: itemName,
        image: itemSource,
        sizes: [
          {size: itemSize[0].size, quantity: 1, price: itemSize[0].price},
        ],
        description: itemDes,
        roasted: itemRoasted,
        ingredient: itemIngredient,
      }),
    );

  };
  
  return (
    <View style={styles.showCoffeeView}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CoffeeDetailsScreen', {
            itemId: itemId,
            itemName: itemName,
            itemPrice: itemPrice,
            itemIngredient: itemIngredient,
            itemSource: itemSource,
            itemDes: itemDes,
            itemSize: itemSize,
            itemRating: itemRating,
            itemRoasted: itemRoasted,
            itemRatCount: itemRatCount,
            itemIngredient_0: itemIngredient_0,
            itemType: itemType,
          })
        }>
        <Image source={source} style={styles.showCoffeeimage} />
        <Text
          style={{
            fontSize: sizes.size4,
            color: colors.color6,
            fontFamily: fonts,
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: sizes.size6,
            fontFamily: fonts,
            color: colors.color6,
          }}>
          {itemIngredient}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: colors.color7,
              fontSize: sizes.size3,
              // fontWeight: '700',
              fontFamily: fonts,
            }}>
            <Text
              style={{
                color: colors.color2,
                fontFamily: fonts,
              }}>
              $
            </Text>
            {price}
          </Text>
          <View ref={addRef} onLayout={() => {}}>
            <TouchableOpacity
              style={styles.addIconView}
              onPress={() => {
                addRef.current?.measureInWindow((x, y, width, height) => {
                  onAddToCartPress(x, y);
                });
                handleAddtoCart();
                PlaySound(require('../assets/sounds/cool.mp3'))
              }}>
              <Image
                style={styles.addIcon}
                source={require('../../assets/icons/plus.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  showCoffeeView: {
    padding: 10,
    borderRadius: 17,
    backgroundColor: colors.color4,
    marginHorizontal: 8,
    gap: 7,
  },
  showCoffeeimage: {
    height: smallIconDim(7, 7).height,
    width: smallIconDim(7, 7).height,
    alignSelf: 'center',
    borderRadius: 17,
  },
  addIconView: {
    height: smallIconDim(1.7, 1.7).height,
    width: smallIconDim(1.7, 1.7).width,
    borderRadius: 7,
    backgroundColor: colors.color2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    height: smallIconDim(0.8, 0.8).height,
    width: smallIconDim(0.8, 0.8).width,
  },
});

export default ShowCoffees;
