import {View, Text, StyleSheet, Image} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import Home from '../screens/Home';
import UserInfoScreen from '../screens/UserInfoScreen';
import colors from '../utils/colors';
import { topMargin } from '../utils/dimensions';

const Drawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerActiveTintColor:colors.color2, drawerInactiveTintColor: 'white', drawerItemStyle: {backgroundColor: colors.color4,}}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={'Home'} component={Home} />
      <Drawer.Screen name={'User'} component={UserInfoScreen} />
    </Drawer.Navigator>
  );
};

const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
        <DrawerContentScrollView contentContainerStyle={{backgroundColor: colors.color3, gap: 10, flex: 1}} {...props}>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>

            <Image style={{height: topMargin(8), width: topMargin(10)}} source={require('../../assets/images/MainImage.png')} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        </View>
    )
}

export default Drawer;

// const styles = StyleSheet.create({})
