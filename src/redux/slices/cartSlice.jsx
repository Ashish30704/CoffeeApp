import {createSlice} from '@reduxjs/toolkit';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  cartEmpty: true,
  cartItems: [],
};

const setCartItemFirebase = async(data) => {
  try {
    const auth = getAuth()
    const uid = auth.currentUser.uid
      await firestore().collection('userCarts').doc(uid).set({
        data
  })
    console.log("cart Stored")
  } catch(e) {
    console.log(e.message);    
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartEmpty: state => {
      state.cartEmpty = true;
    },
    setCartNotEmpty: state => {
      state.cartEmpty = false;
    },
    setCartItem: (state, action) => {
      const Item = state.cartItems.find(item => item.id === action.payload.id);
      if (Item) {
        const ItemSize = Item.sizes.find(
          size => size.size === action.payload.sizes[0].size,
        );
        if (ItemSize) {
          ItemSize.quantity += action.payload.sizes[0].quantity;
          // setData(state.cartItems)
        } else {
          Item.sizes.push({
            size: action.payload.sizes[0].size,
            quantity: 1,
            price: action.payload.sizes[0].price,
          });
            // setData(state.cartItems)
        }
      } else {
            state.cartItems.push(action.payload);

            // setData(state.cartItems)

            // Alert.alert("Item added to cart successfully!")
      }
      setCartItemFirebase(state.cartItems)
      state.cartEmpty = state.cartItems.length === 0
      //   state.cartItems.length > 0 ? state.cartEmpty = false: state.cartEmpty = true
    },
    increaseItemQuantity: (state, action) => {
      const Item = state.cartItems.find(
        item => item.id === action.payload.itemId,
      );
      if (Item) {
        const getItem = Item.sizes.find(
          item => item.size === action.payload.itemSize,
        );
        if (getItem) {
          getItem.quantity += 1;
        }
    }
    // setData(state.cartItems)
    setCartItemFirebase(state.cartItems)
  },
  decreaseItemQuantity: (state, action) => {
      const Item = state.cartItems.find(
        item => item.id === action.payload.itemId,
      );
      if (Item) {
        // if (Item.sizes.length > 0) {
        const getItem = Item.sizes.find(
          item => item.size === action.payload.itemSize,
        );
        if (getItem) {
          getItem.quantity = Math.max(0, getItem.quantity - 1);
          if (getItem.quantity === 0) {
            Item.sizes = Item.sizes.filter(item => item.size !== getItem.size);
          }
        }
        const totalQuan = Item.sizes.reduce(
          (sum, item) => (sum = sum + item.quantity),
          0,
        );
        if (totalQuan === 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== Item.id);
        }
        // }
        state.cartEmpty = state.cartItems.length === 0;
      }
      // setData(state.cartItems)
      setCartItemFirebase(state.cartItems)
    },
    deleteCartItems: (state) => {
      state.cartItems = [];
      state.cartEmpty = true
      // setData(state.cartItems)
      setCartItemFirebase(state.cartItems)
    }, 
    cartFromFireStore: (state, actions) => {
      state.cartItems = actions.payload
      state.cartEmpty = state.cartItems.length === 0
    }
  },
});

export const {
  setCartEmpty,
  setCartNotEmpty,
  setCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteCartItems,
  cartFromFireStore
} = cartSlice.actions;
export default cartSlice.reducer;