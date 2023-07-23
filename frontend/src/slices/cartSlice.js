import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUpdate";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).cartItems : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: 'PayPal',
}
// console.log(JSON.parse(localStorage.getItem('cartItems')).cartItems, "data from localstorage")
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            updateCart(state);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
            updateCart(state);
        },
        addShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
        },
        addPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
        }
    }
});

export const { addToCart, removeFromCart, addShippingAddress, addPaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;