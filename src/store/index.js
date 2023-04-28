import { api } from './apiSlice';
import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../pages/dogs/dogsSlice";
import servicesReducer from "../pages/services/servicesSlice";

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    services: servicesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware)
  
});
