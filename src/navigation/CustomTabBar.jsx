import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import colors from "../utils/colors";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  // console.log(descriptors);
  
  const icons = {
    Home: require("../../assets/icons/home.png"),
    Payment: require("../../assets/icons/applePay.png"),
    Cart: require("../../assets/icons/bag.png"),
    Favourite: require('../../assets/icons/heart.png'),
    "Order History": require("../../assets/icons/bell.png"),
    HomeWithDrawer: require("../../assets/icons/home.png"),
  };

  return (
    <View style={styles.container} >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.name} onPress={onPress} style={styles.tabButton}>
            <View style={{height: 25, width: 70, alignItems: 'center', justifyContent: 'center',}}>
            <Image source={icons[route.name]} style={[styles.icon, isFocused && styles.activeIcon]} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.color3,
    // backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: "center",
  },
  icon: {
    // flex: 1,
    // height: 20,
    // width: 15,
    tintColor: "gray",
  },
  activeIcon: {
    tintColor: "#ff6347",
    transform: [{translateY: -3}]
  },
});

export default CustomTabBar;
