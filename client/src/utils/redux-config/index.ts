import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from '../../features/userSession/userSessionSlice';
import userRegisterReducer from '../../features/userRegister/userRegisterSlice';
import userSearchSlice from '../../features/googleSearch/searchSlice';

export const store = configureStore({
    reducer: {
        userSession: userSessionReducer,
        userRegister: userRegisterReducer,
        googleSearch: userSearchSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});