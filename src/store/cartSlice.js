import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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
  lastOrderNumber: null,
};

const buildCartItemId = (tourSlug, departureDate) => `${tourSlug}__${departureDate}`;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action) {
      const item = action.payload;
      const cartItemId = buildCartItemId(item.tourSlug, item.departureDate);
      const existingItem = state.items.find((cartItem) => cartItem.id === cartItemId);
      const travelers = Math.max(1, Number(item.travelers) || 1);

      if (existingItem) {
        existingItem.travelers += travelers;
      } else {
        state.items.push({
          id: cartItemId,
          ...item,
          travelers,
        });
      }

      state.addedToCart = true;
    },
    updateCartItemTravelers(state, action) {
      const { id, travelers } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (item) {
        item.travelers = Math.max(1, Number(travelers) || 1);
      }
    },
    removeCartItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    dismissAddedToCart(state) {
      state.addedToCart = false;
    },
    setCheckoutDetails(state, action) {
      state.customerInfo = action.payload.customerInfo;
      state.paymentMethod = action.payload.paymentMethod;
      state.lastOrderNumber = action.payload.orderNumber;
      state.items = [];
      state.addedToCart = false;
    },
  },
});

export const {
  addCartItem,
  dismissAddedToCart,
  removeCartItem,
  setCheckoutDetails,
  updateCartItemTravelers,
} = cartSlice.actions;
export default cartSlice.reducer;
