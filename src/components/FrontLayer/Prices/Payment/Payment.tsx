import { useDispatch, useSelector } from "react-redux";
import "./Payment.css";
import { RootState } from "../../../../redux/store";
import {
	cancelPayment,
	setErrors,
	ProcessPaymentStates,
	setProcessState,
} from "../../../../redux/paymentSlice";
import { isValidCreditCard } from "./CreditCardValidator";
import Process from "./Proccess/Process";
import Confirm from "./Confirm/Confirm";
import Success from "./Success/Success";
import Fail from "./Fail/Fail";

function Payment() {
	const {
		onPay,
		email = "",
		userName = "",
		phone = "",
		card = "",
		expirationYear = 0,
		expirationMonth = 0,
		documentType = "",
		documentNumber = 0,
		CVV = 0,
		processState = ProcessPaymentStates.Proccess,
	} = useSelector((state: RootState) => state.payment);

	const { activeHamburger } = useSelector(
		(state: RootState) => state.hamburguer
	);

	const dispatch = useDispatch();

	const cancelPaymentForm = () => {
		dispatch(cancelPayment());
	};

	const validateForm = (currentState: ProcessPaymentStates) => {
		if (currentState == ProcessPaymentStates.Proccess) {
			const validForm = {
				"Name and lastname format": userName.length >= 3,
				"Email format": /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
				"Phone format": /^\d{7,}$/.test(phone),
				"Card format": /^\d{12,}$/.test(card),
				"Expiration dates": Boolean(expirationMonth && expirationYear),
				"Security code format": CVV > 100 && CVV < 9999,
				"Document type": Boolean(documentType),
				"Document number format": documentNumber > 0,
			};

			const errors: string =
				"Error in format of the data, please check: ";
			const errorsList = Object.entries(validForm)
				.filter(([, val]) => !val)
				.map(([key, ,]) => key)
				.join(", ");
			if (errorsList != "") {
				return dispatch(setErrors(errors + errorsList));
			}
			dispatch(setErrors(""));
			dispatch(setProcessState(ProcessPaymentStates.Confirm));
		} else if (currentState == ProcessPaymentStates.Confirm) {
			const validCard = isValidCreditCard(card);
			if (validCard) {
				dispatch(setProcessState(ProcessPaymentStates.Success));
			} else {
				dispatch(setProcessState(ProcessPaymentStates.Fail));
			}
		}
	};

	return (
		<form
			id="paymentForm"
			role="paymentForm"
			onSubmit={(e) => e.preventDefault()}
			className={`pay-data ${onPay && !activeHamburger ? "active" : ""}`}
		>
			<button
				className="close-button"
				type="reset"
				onClick={() => cancelPaymentForm()}
			>
				x
			</button>
			<Process />
			<Confirm />
			<Success />
			<Fail />

			{processState == ProcessPaymentStates.Fail ||
			processState == ProcessPaymentStates.Confirm ? (
				<button
					className="process-button"
					onClick={() =>
						dispatch(setProcessState(ProcessPaymentStates.Proccess))
					}
				>
					Edit Info
				</button>
			) : (
				<></>
			)}
			
			{processState == ProcessPaymentStates.Proccess ||
			processState == ProcessPaymentStates.Confirm ? (
				<button
					className="process-button"
					onClick={() => validateForm(processState)}
				>
					{processState == ProcessPaymentStates.Proccess
						? "Continue"
						: "Confirm and Pay"}
				</button>
			) : (
				<button
					className="process-button"
					type="reset"
					onClick={() => cancelPaymentForm()}
				>
					Close
				</button>
			)}
		</form>
	);
}

export default Payment;
