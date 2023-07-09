import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => PRODUCTS_URL,
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => `${PRODUCTS_URL}/${productId}`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;