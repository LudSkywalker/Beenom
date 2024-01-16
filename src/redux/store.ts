import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hamburguerReducer from "./hamburguerSlice";
import paymentReducer from "./paymentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "beenom",
	storage,
	blacklist: [],
};
const rootReducer = combineReducers({
	hamburguer: hamburguerReducer,
	payment: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
