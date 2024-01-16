import { createSlice } from "@reduxjs/toolkit";

const priceUnitBeenom = 4000;
export const documentTypes = ["CC", "CE", "TI"];

export enum ProcessPaymentStates {
	Proccess = "Proccess",
	Confirm = "Confirm",
	Success = "Success",
	Fail = "Fail",
}
export interface paymentState {
	quantity?: number;
	totalPrice?: number;
	onPay?: boolean;
	email?: string;
	userName?: string;
	phone?: string;
	card?: string;
	expirationYear?: number;
	expirationMonth?: number;
	CVV?: number;
	documentType?: string;
	documentNumber?: number;
	instalments?: number;
	errors?: string;
	processState?: ProcessPaymentStates;
}

export const initialState: paymentState = {
	quantity: 1,
	totalPrice: priceUnitBeenom,
	onPay: false,
	email: "",
	userName: "",
	phone: "",
	card: "",
	expirationYear: 0,
	expirationMonth: 0,
	CVV: 0,
	documentType: "",
	documentNumber: 0,
	instalments: 1,
	errors: "",
	processState: ProcessPaymentStates.Proccess,
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
		setPaymentData: (state, { payload }) => {
			const newState = { ...state, ...payload };
			return newState;
		},
		cancelPayment: () => {
			return initialState;
		},
		incrementInstalments: (state) => {
			state.instalments = (state.instalments || 0) + 1;
		},
		decrementInstalments: (state) => {
			if (state.instalments && state.instalments > 1) {
				state.instalments -= 1;
			}
		},
		setErrors: (state, { payload: errors }) => {
			state.errors = errors;
		},
		setProcessState: (state, { payload: processState }) => {
			state.processState = processState;
		},
	},
});

export const {
	incrementQuantity,
	decrementQuantity,
	toggleOnPay,
	setPaymentData,
	cancelPayment,
	incrementInstalments,
	decrementInstalments,
	setErrors,
	setProcessState,
} = paymentSlice.actions;

export default paymentSlice.reducer;
