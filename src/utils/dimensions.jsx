import { Dimensions } from "react-native";

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const horizonPadding = (t) => {
    if(windowWidth<=300) {
        return t*10
    } else if(windowWidth>300 && windowWidth<500) {
        return t*15
    } else {
        t*20
    }
}

export const smallIconDim = (t, u) => {
    if(windowWidth<=300) {
        return {height:t*10, width:u*10}
    } else if(windowWidth>300 && windowWidth<500) {
        return {height:t*15, width:u*15}
    } else {
        return {height:t*20, width:u*20}
    }
}

export const topMargin = (t) => {
    if (windowHeight> 1000) {
        return t*30
    } else {
        return t*15
    }
}
