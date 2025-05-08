import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




const initialState = {
    addressList: [],
    selectedAdd: ''
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            const existing = state.addressList.find(item => item.number === action.payload.number);
            if (existing) {
                existing.address = action.payload.address;
            } else {
                state.addressList.push(action.payload);
            }
            setAddress(state.addressList);
        },
        setAddressItems: (state, action) => {
            state.addressList = action.payload
        },
        clearAddress: (state, action) => {
            state.addressList = []
            setAddress(state.addressList)
        }
    },
});

export const { addAddress, clearAddress, setAddressItems } = addressSlice.actions;
export default addressSlice.reducer;
