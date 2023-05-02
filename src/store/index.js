import { api } from './apiSlice';
import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../pages/dogs/dogsSlice";

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware)
  
});
