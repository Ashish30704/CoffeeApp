import {createSlice} from '@reduxjs/toolkit';
import CoffeeData from '../../utils/CoffeeData';

const initialState = {
  coffeeTypes: [
    {
      id: '0',
      name: 'All',
    },
  ],

  displayCoffees: CoffeeData,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCoffeeType: state => {
      for (let i = 0; i < CoffeeData.length; i++) {
        const Item = state.coffeeTypes.some(
          item => item.name === CoffeeData[i].name,
        );
        if (!Item) {
          state.coffeeTypes.push({
            id: String(state.coffeeTypes.length),
            name: CoffeeData[i].name,
          });
        }
      }
    },
    setDisplayCoffees: (state, action) => {
      if (action.payload === 'All' || action.payload === '') {
        state.displayCoffees = CoffeeData;
        return;
      }
      state.displayCoffees = CoffeeData.filter(item =>
        item.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    getCoffees: (state, actions) => {
        state.CoffeeData = actions.payload
        state.displayCoffees = state.CoffeeData
    }
  },
});

export const {setCoffeeType, setDisplayCoffees, getCoffees} = homeSlice.actions;
export default homeSlice.reducer;
