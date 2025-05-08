import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice,} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const setCurrentUser = async (value) => {
    try {
        const Value = JSON.stringify(value)
        await AsyncStorage.setItem('currentUser', Value)
    } catch (e) {
        Alert.alert('current user not saved')
    }
}
const setLoginStatus = async (value) => {
    try {
        const Value = JSON.stringify(value)
        await AsyncStorage.setItem('loginStatus', Value)
    } catch (e) {
        Alert.alert('login status not saved')
    }
}

const initialState = {
  isLoggedIn: false,
  // userInfo: [],
  currentUser: null,
  currentUserImage: '',
  imageSelected: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      
        state.currentUser = actions.payload;
        state.isLoggedIn = true;
      
      setCurrentUser(state.currentUser)
      setLoginStatus(state.isLoggedIn)
      // setUserData(state.userInfo)
    //   setData(state.isLoggedIn, state.userInfo, state.currentUser);
    },
    deleteUser: (state, actions) => {

    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      setCurrentUser(state.currentUser)
      setLoginStatus(state.isLoggedIn)
    },
    restoreLoginState: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        // state.userInfo = action.payload.userInfo;
        state.currentUser = action.payload.currentUser;
    },
    setUserImage: (state, actions) => {
      if(actions.payload !== '') {
        state.currentUserImage = actions.payload
        state.imageSelected = true
      } else {
        state.currentUserImage = actions.payload
        state.imageSelected = false
      }
    }
  },
});

export const {registerUser, loginUser, logOutUser, deleteUser, restoreLoginState, setUserImage} = loginSlice.actions;
export default loginSlice.reducer;
