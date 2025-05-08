// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CoffeeDetailsScreen from '../screens/CoffeeDetailsScreen';
import {StyleSheet, ActivityIndicator} from 'react-native';
import colors from '../utils/colors';
import BottomTabs from './BottomTabs';
import {Provider} from 'react-redux';
import store from '../redux/Store';
import PaymentScreen from '../screens/PaymentScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import AddressScreen from '../screens/AdressScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="BottomTabs"
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={UserInfoScreen} />
          <Stack.Screen
            name="CoffeeDetailsScreen"
            component={CoffeeDetailsScreen}
            />
          <Stack.Screen name='Cart' component={CartScreen} />
          <Stack.Screen name='AddressScreen' component={AddressScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name='Search' component={SearchScreen} />
        </Stack.Navigator>
        {/* <BottomTabs /> */}
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.color3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.color7,
  },
});

export default MyStack;
