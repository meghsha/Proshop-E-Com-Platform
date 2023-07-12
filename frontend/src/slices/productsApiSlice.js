import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => PRODUCTS_URL,
            keepUnusedDataFor: 60*60*1000, // 1 hour
        }),
        getProductById: builder.query({
            query: (productId) => `${PRODUCTS_URL}/${productId}`,
            keepUnusedDataFor: 60*60*1000, // 1 hour
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;