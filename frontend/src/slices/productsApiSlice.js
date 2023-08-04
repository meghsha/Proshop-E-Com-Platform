import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({pageNumber, keyword}) => ({
              url: PRODUCTS_URL, 
              params: {
                pageNumber,
                keyword,
              } 
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
          }),
          getProductById: builder.query({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
          }),
          createProduct: builder.mutation({
            query: () => ({
              url: `${PRODUCTS_URL}`,
              method: 'POST',
            }),
            invalidatesTags: ['Product'],
          }),
          updateProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Products'],
          }),
          uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOADS_URL}`,
              method: 'POST',
              body: data,
            })
          }),
          deleteProduct: builder.mutation({
            query: (productId) => ({
              url: `${PRODUCTS_URL}/${productId}`,
              method: 'DELETE',
            }),
          }),
          createProductReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
          getTopProducts: builder.query({
            query: () => ({
              url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
          }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateProductReviewMutation, useGetTopProductsQuery } = productsApiSlice;