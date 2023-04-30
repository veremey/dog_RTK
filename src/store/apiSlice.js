import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAge, getSize } from '../pages/dogs/dogsSlice';

export const api =  createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
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
      }
    }
    
    ),
    makeContact: builder.mutation({
      query: (body) => ({
        url: "contact", 
        method: "POST", 
        body
      })
    })
  }),
})

export const { 
  useGetServicesQuery,
  useGetServiceQuery,
  useMakeContactMutation,
  useGetDogsQuery,
}  = api
