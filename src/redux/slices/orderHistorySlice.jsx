import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native";


const initialState = {
    historyItems: [],
    historyEmpty: true,
    totalPrice: [],
}

const clearFireHistory = async() => {
    try{
        const auth = getAuth()
        const uid = auth.currentUser.uid
        await firestore().collection('Orders').doc(uid).set({
            data: []
        })
    } catch (e) {
        console.error(e.message)
    }
    
}

const orderHistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistory: (state) => {
            state.historyItems = []
            clearFireHistory()
            state.historyEmpty = true
        },
        setAsyncHistoryItems : (state, actions) => {
            state.historyItems = actions.payload;
            state.historyEmpty = state.historyItems.length === 0 ? true : false           
        }
    }
})

export const {clearHistory, setAsyncHistoryItems} = orderHistorySlice.actions;
export default orderHistorySlice.reducer