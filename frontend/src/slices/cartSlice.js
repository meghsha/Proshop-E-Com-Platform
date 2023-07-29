import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUpdate";

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// console.log(JSON.parse(localStorage.getItem('cartItems')).cartItems, "data from localstorage")

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        addShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        addPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
    }
});

export const { addToCart, removeFromCart, addShippingAddress, addPaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;