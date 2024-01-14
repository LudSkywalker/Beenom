import { configureStore } from "@reduxjs/toolkit";
import hambugerReducer from "./hamburguerState";

export const store = configureStore({
	reducer: { hamburguer: hambugerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
