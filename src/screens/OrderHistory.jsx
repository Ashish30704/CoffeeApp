import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {sizes} from '../utils/texts';
import colors from '../utils/colors';
import {horizonPadding, smallIconDim} from '../utils/dimensions';
import TopBar from '../components/TopBar';
import HistoryComp from '../components/HistoryComp';
import {useSelector, useDispatch} from 'react-redux';
import {clearHistory, setAsyncHistoryItems} from '../redux/slices/orderHistorySlice';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const OrderHistory = () => {
  const historyEmpty = useSelector(state => state.history.historyEmpty);
  const historyItems = useSelector(state => state.history.historyItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const getHistoryItems = async () => {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      try {
        const historyDoc = await firestore().collection('Orders').doc(uid).get();
        if (historyDoc.exists) {
          const historyData = historyDoc.data().data;
          if (Array.isArray(historyData)) {
            dispatch(setAsyncHistoryItems(historyData));
          }
        }
      } catch (e) {
        console.error('Error fetching order history:', e.message);
      }
    };
    getHistoryItems();
  }, [historyItems, historyEmpty]);

  return (
    <View style={styles.mainView}>
      <TopBar />
      <StatusBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          historyEmpty || historyItems.length === 0
            ? {alignItems: 'center', justifyContent: 'center', flex: 1}
            : ''
        }
        showsVerticalScrollIndicator={false}>
        {historyEmpty || historyItems.length === 0 ? (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icons/bag.png')}
              style={{height: 20, width: 17, tintColor: colors.color2}}
            />
            <Text style={{color: 'white', fontSize: 20}}> No History!</Text>
          </View>
        ) : (
          <View style={{gap: 20}}>
            {historyItems
              .slice()
              .reverse()
              .map((group, index) => (
                <View key={index} style={{flexDirection: 'column', gap: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text1}>Order Date</Text>
                      <Text
                        style={{color: colors.color7, fontSize: sizes.size4}}>
                        {group.orderDate}
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                      <Text style={styles.text1}>Total Amount</Text>
                      <Text
                        style={{color: colors.color2, fontSize: sizes.size4}}>
                        {group.orderPrice}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text style={styles.text1}>Ordered To-</Text>
                    <Text style={{color: colors.color2, fontSize: sizes.size4}}>
                      {group.orderAddress.name}, {group.orderAddress.address},{' '}
                      {group.orderAddress.city}
                    </Text>
                  </View>
                  <View>
                    {group.data?.map(item => (
                      <HistoryComp
                        key={item.id}
                        ItemId={item.id}
                        itemImage={item.image}
                        itemIngredient={item.ingredient}
                        itemName={item.name}
                        itemTotalPrice={parseFloat(
                          item.sizes
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0,
                            )
                            .toFixed(2),
                        )}
                        itemSize={item.sizes}
                      />
                    ))}
                  </View>
                </View>
              ))}
            <TouchableOpacity
              onPress={() => dispatch(clearHistory())}
              style={styles.deleteButton}>
              <Text
                style={{
                  color: colors.color2,
                  fontSize: sizes.size3,
                  fontWeight: 600,
                }}>
                Clear History
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.color3,
    flex: 1,
    paddingHorizontal: horizonPadding(1.5),
  },
  scrollView: {
    marginTop: smallIconDim(7, 5).height,
  },
  deleteButton: {
    height: smallIconDim(2.5, 3).height,
    width: smallIconDim(7, 7).width,
    backgroundColor: colors.color7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    alignSelf: 'center',
  },
  text1: {
    color: colors.color7,
    fontSize: sizes.size3,
    fontWeight: 600,
  },
});
