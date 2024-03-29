import { createSlice } from "@reduxjs/toolkit";

export interface hamburguerState {
	activeHamburger: boolean;
	activeItem: string;
}

export const initialState: hamburguerState = {
	activeHamburger: false,
	activeItem: "Product",
};

export const hamburguerSlice = createSlice({
	name: "hamburguer",
	initialState,
	reducers: {
		toggleHambuger: (state) => {
			state.activeHamburger = !state.activeHamburger;
		},
		changeItem: (state, { payload: item }) => {
			state.activeHamburger = false;
			state.activeItem = item;
		},
	},
});

export const { toggleHambuger, changeItem } = hamburguerSlice.actions;

export default hamburguerSlice.reducer;
