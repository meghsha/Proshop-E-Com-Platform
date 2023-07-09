import { createSlice } from "@reduxjs/toolkit";

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const initialState = {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []},
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            
            // calculate itemsPrice
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // calculate shippingPrice
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // calculate taxPrice
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            // calculate totalPrice
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) + 
                Number(state.taxPrice)
            );

            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;