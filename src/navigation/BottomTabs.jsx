import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import { Text, View } from 'react-native';
import Home from '../screens/Home';
import CartScreen from '../screens/CartScreen';
import OrderHistory from '../screens/OrderHistory';
import FavouritesScreen from '../screens/FavouritesScreen';
import Drawer from './Drawer';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {

  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{headerShown: false}}>
      <Tab.Screen name='HomeWithDrawer' component={Drawer} options={{}} />
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavouritesScreen} />
      <Tab.Screen name="Order History" component={OrderHistory} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
