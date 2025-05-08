import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favItems: [],
  favEmpty: true,
};
const setData = async value => {
  console.log(value, '-=-=-==-=---=');

  try {
    const jasonValue = JSON.stringify(value);
    await AsyncStorage.setItem('favItems', jasonValue);
  } catch (e) {
    Alert.alert('Item not saved!');
  }
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavItems: (state, action) => {
      console.log(action.payload);

      const Item = state.favItems.find(item => item.id === action.payload.id);
      console.log(Item);
      
      if (Item) {
        state.favItems = state.favItems.filter(
          item => item.id !== action.payload.id,
        );
      } else {
       state.favItems= [...state.favItems, action.payload];
      }
      console.log(state.favItems);
      
      setData(state.favItems);
      

      state.favEmpty = state.favItems.length === 0;
    },
    setFavItems: (state, action) => {
      state.favItems = action.payload;
      state.favEmpty = state.favItems.length === 0;
      // setData(state.favItems)
    },
  },
});

export const {addToFavItems, setFavItems} = favouriteSlice.actions;
export default favouriteSlice.reducer;
