import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';
import colors from '../utils/colors';
import {sizes, fonts} from '../utils/texts';
import {
  horizonPadding,
  screenHeight,
  screenWidth,
  smallIconDim,
  topMargin,
} from '../utils/dimensions';
import ShowCoffees from '../components/ShowCoffees';
import TopBar from '../components/TopBar';
import BeansData from '../utils/BeansData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {cartFromFireStore} from '../redux/slices/cartSlice';
import {setFavItems} from '../redux/slices/favouriteSlice';
import {
  setCoffeeType,
  setDisplayCoffees,
  getCoffees,
} from '../redux/slices/homeSlice';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setUserImage} from '../redux/slices/loginSlice';

const Home = () => {
  const coffeeTypes = useSelector(state => state.home.coffeeTypes);
  // const [BeansData, setBeansData] = useState([])
  const displayCoffees = useSelector(state => state.home.displayCoffees);
  const [selectedType, setSelectedType] = useState('All');
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // getProductData();
    getCartItem();
    getFavItem();
    fetchImage();
    dispatch(setCoffeeType());
  }, []);

  const getProductData = async () => {
    try {
      const doc = await firestore()
        .collection('Products')
        .doc('BeansData')
        .get();
      const doc2 = await firestore()
        .collection('Products')
        .doc('CoffeeData')
        .get();
      if (doc.exists && doc2.exists) {
        // setBeansData(doc.data().data)
        dispatch(getCoffees(doc2.data().data));
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const fetchImage = async () => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const doc = await firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data().imageUri;
        if (data !== '') {
          dispatch(setUserImage(data));
        }
      }
    } catch (e) {
      console.error('error: ', e.message);
    }
  };

  const getCartItem = async () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    try {
      const cartDoc = await firestore().collection('userCarts').doc(uid).get();
      if (cartDoc.exists) {
        const cartData = cartDoc.data().data;
        if (Array.isArray(cartData)) {
          dispatch(cartFromFireStore(cartData));
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const getFavItem = async () => {
    const FavItem = await AsyncStorage.getItem('favItems');
    if (FavItem) {
      let parFavItem = JSON.parse(FavItem);
      dispatch(setFavItems(parFavItem));
    }
  };

  const handleSelectedType = name => {
    setSelectedType(name);
    dispatch(setDisplayCoffees(name));
    setSearchText(name);
    // console.log(displayCoffees)
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const moveToCartAnim = useRef(new Animated.ValueXY({x: 1000, y: 0})).current;
  const [flyVisible, setFlyVisible] = useState(false);

  const startAnimation = (startX, startY) => {
    moveToCartAnim.setValue({x: startX, y: startY});
    // console.error(moveToCartAnim)
    setFlyVisible(true);
    Animated.timing(moveToCartAnim, {
      toValue: {x: screenWidth * 0.35, y: screenHeight},
      duration: 1200,
      useNativeDriver: false,
    }).start(() => {
      setFlyVisible(false);
    });
  };

  const ListComp = ({name, id}) => (
    <TouchableOpacity
      style={{paddingHorizontal: 8}}
      onPress={() => handleSelectedType(name)}>
      <Text
        style={[
          styles.selectListItem,
          {color: name === selectedType ? colors.color2 : colors.color5},
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <TopBar />
      <StatusBar backgroundColor={'transparent'} translucent />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: horizonPadding(1.5)}}>
          <View></View>
          <View>
            <Text style={styles.mainHeading}>
              Find the best {'\n'}coffee for you
            </Text>
          </View>
          <View style={styles.searchBar}>
            <Image source={require('../../assets/icons/search.png')} />
            <TextInput
              placeholder="Find Your Choice"
              placeholderTextColor={colors.color5}
              fontFamily={fonts}
              fontSize={sizes.size4}
              style={styles.searchText}
              onFocus={() => handleSearch()}
              // value={searchText}
              // onChange={(value) => handleSelectedType(value)}
            />
          </View>
        </View>
        <View style={{paddingLeft: horizonPadding(0)}}>
          <View style={styles.selectList}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: horizonPadding(1)}}
              data={coffeeTypes}
              renderItem={({item}) => {
                return <ListComp name={item.name} id={item.id} />;
              }}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
          <View style={styles.selectList}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: horizonPadding(1)}}
              data={displayCoffees}
              renderItem={({item}) => (
                <ShowCoffees
                  source={item.imagelink_square}
                  name={item.name}
                  price={item.prices[0].price}
                  ingredient={item.special_ingredient}
                  id={item.id}
                  des={item.description}
                  size={item.prices}
                  rating={item.average_rating}
                  roasted={item.roasted}
                  ratCount={item.ratings_count}
                  ingredient_0={item.ingredients}
                  type={item.type}
                  onAddToCartPress={startAnimation}
                  // move={moveToCartAnim}
                />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
          <Text style={styles.subHeading}>Coffee Beans</Text>
          <View style={styles.selectList}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: horizonPadding(1)}}
              data={BeansData}
              renderItem={({item}) => (
                <ShowCoffees
                  source={item.imagelink_square}
                  name={item.name}
                  price={item.prices[0].price}
                  ingredient={item.special_ingredient}
                  id={item.id}
                  des={item.description}
                  size={item.prices}
                  rating={item.average_rating}
                  roasted={item.roasted}
                  ratCount={item.ratings_count}
                  ingredient_0={item.ingredients}
                  type={item.type}
                  onAddToCartPress={startAnimation}
                />
              )}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </View>
      </ScrollView>
      {flyVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 1000,
            transform: moveToCartAnim.getTranslateTransform(),
          }}>
          <View style={styles.animView}>
            <Image
              source={require('../../assets/icons/coffeeMug.png')}
              style={styles.animView}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    // bottom: 20,
  },
  scrollView: {
    // paddingTop: smallIconDim(5, 5).height,
    marginTop: smallIconDim(7, 5).height,
  },
  mainHeading: {
    fontSize: sizes.size1,
    color: colors.color7,
    fontWeight: 'bold',
    fontFamily: fonts,
    marginBottom: topMargin(1.7),
  },
  searchBar: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.color4,
    padding: 4,
    borderRadius: 15,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  searchText: {
    color: 'white',
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: fonts,
  },
  selectList: {
    paddingVertical: 20,
  },
  selectListItem: {
    color: colors.color5,
    fontSize: sizes.size3,
    // fontWeight: 500,
    fontFamily: fonts,
  },
  subHeading: {
    fontSize: sizes.size2,
    color: colors.color7,
    // fontWeight: '600',
    fontFamily: fonts,
    paddingHorizontal: 15,
  },
  animView: {
    height: 25,
    width: 25,
    backgroundColor: colors.color2,
    borderRadius: 50,
  },
});

export default Home;
