import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './slices/homeSlice';
import cartReducer from './slices/cartSlice';
import favReducer from './slices/favouriteSlice';
import historyReducer from './slices/orderHistorySlice';
import loginReducer from './slices/loginSlice';
import addressReducer from './slices/addressSlice';

const store = configureStore({
    reducer: {
        home: homeReducer,
        cart: cartReducer,
        favourite: favReducer,
        history: historyReducer,
        login: loginReducer,
        address: addressReducer,
    },
});

export default store;