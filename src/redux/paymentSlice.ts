import { createSlice } from "@reduxjs/toolkit";

const priceUnitBeenom = 4000;
export const documentTypes = ["CC", "CE", "TI"];

export interface paymentState {
	quantity?: number;
	totalPrice?: number;
	onPay?: boolean;
	email?: string;
	userName?: string;
	phone?: string;
	card?: string;
	expirationYear?: number | null;
	expirationMonth?: number | null;
	CVV?: number | null;
	documentType?: string;
	documentNumber?: number | null;
	instalments?: number;
}

const initialState: paymentState = {
	quantity: 1,
	totalPrice: priceUnitBeenom,
	onPay: false,
	email: "",
	userName: "",
	phone: "",
	card: "",
	expirationYear: null,
	expirationMonth: null,
	CVV: null,
	documentType: "",
	documentNumber: null,
	instalments: 1,
};

export const paymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		incrementQuantity: (state) => {
			state.quantity = (state.quantity || 0) + 1;
			state.totalPrice = state.quantity * priceUnitBeenom;
		},
		decrementQuantity: (state) => {
			if (state.quantity && state.quantity > 1) {
				state.quantity -= 1;
				state.totalPrice = state.quantity * priceUnitBeenom;
			}
		},
		toggleOnPay: (state) => {
			state.onPay = !state.onPay;
		},
		setPaymentData: (
			state,
			{
				payload: {
					email,
					phone,
					card,
					userName,
					expirationYear,
					expirationMonth,
					CVV,
					documentType,
					documentNumber,
					instalments,
				},
			}
		) => {
			state.email = email != undefined ? email : state.email;
			state.userName = userName != undefined ? userName : state.userName;
			state.phone = phone != undefined ? phone : state.phone;
			state.card = card != undefined ? card : state.card;
			state.expirationYear =
				expirationYear != undefined
					? expirationYear
					: state.expirationYear;
			state.expirationMonth =
				expirationMonth != undefined
					? expirationMonth
					: state.expirationMonth;
			state.CVV = CVV != undefined ? CVV : state.CVV;
			state.documentType =
				documentType != undefined ? documentType : state.documentType;
			state.documentNumber =
				documentNumber != undefined
					? documentNumber
					: state.documentNumber;
			state.instalments =
				instalments != undefined ? instalments : state.instalments;
		},
	},
});

export const {
	incrementQuantity,
	decrementQuantity,
	toggleOnPay,
	setPaymentData,
} = paymentSlice.actions;

export default paymentSlice.reducer;
