import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTourSlug: null,
  departureDate: 'Flexible planning',
  quantity: 1,
  addedToCart: false,
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  },
  paymentMethod: 'cash',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartSelection(state, action) {
      state.selectedTourSlug = action.payload.selectedTourSlug;
      state.departureDate = action.payload.departureDate;
      state.quantity = action.payload.quantity;
      state.addedToCart = true;
    },
    updateQuantity(state, action) {
      state.quantity = Math.max(1, action.payload);
    },
    setCheckoutDetails(state, action) {
      state.customerInfo = action.payload.customerInfo;
      state.paymentMethod = action.payload.paymentMethod;
      state.addedToCart = false;
    },
  },
});

export const { setCartSelection, updateQuantity, setCheckoutDetails } = cartSlice.actions;
export default cartSlice.reducer;
