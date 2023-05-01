import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAge, getSize } from '../pages/dogs/dogsSlice';

export const api =  createApi({
  keepUnusedDataFor: 5,
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnFocus: true, 
  refetchOnReconnect: true, 
  tagTypes: ["Services", "Dogs"],
  endpoints: (builder) => ({
    getServices: builder.query({query: () => "/services",}),
    getService: builder.query({query: (id) => `/services/${id}`}),
    getDogs: builder.query({
      query: () => '/dogs',
      transformResponse: (dogs) => {
        const allDogs = {};
        for (const id in dogs) {
          const dog = dogs[id];
          allDogs[id] = {
            ...dog,
            size: getSize(dog.weight),
            age: getAge(dog.dob)
          }
        }
        return allDogs;
      },
      providesTags: ["Dogs"],
    }),
    makeContact: builder.mutation({
      query: (body) => ({
        url: "contact", 
        method: "POST", 
        body
      })
    }),
    addDog: builder.mutation({
      query: (body) => ({
        url: "/dogs",
        method: "POST",
        body
      }), 
      invalidatesTags: ["Dogs"],
    }),
    removeDog: builder.mutation({
      query: (id) => ({
        url: `/dogs/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: ["Dogs"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const update = dispatch(api.util.updateQueryData("getDogs", undefined, (dogs) => {
          delete dogs[id];
        }));
        queryFulfilled.catch(() => {
          update.undo();
        }),
      },
    }),
  }),
})

export const { 
  useGetServicesQuery,
  useGetServiceQuery,
  useMakeContactMutation,
  useGetDogsQuery,
  useAddDogMutation,
  useRemoveDogMutation,
}  = api
