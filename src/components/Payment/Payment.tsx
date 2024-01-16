import { useDispatch, useSelector } from "react-redux";
import "./Payment.css";
import { RootState } from "../../redux/store";
import {
	setPaymentData,
	paymentState,
	documentTypes,
	cancelPayment,
	decrementInstalments,
	incrementInstalments,
	setErrors,
	ProcessPaymentStates,
	setProcessState,
} from "../../redux/paymentSlice";
import { getCreditCardBrand, isValidCreditCard } from "./CreditCardValidator";

const mothsList = Array.from({ length: 12 }, (_, index) => index + 1);
const yearsList = Array.from(
	{ length: 20 },
	(_, index) => index + new Date().getFullYear()
);

function Payment() {
	const {
		quantity = 0,
		totalPrice = 0,
		onPay,
		email = "",
		userName = "",
		phone = "",
		card = "",
		expirationYear = 0,
		expirationMonth = 0,
		documentType = "",
		documentNumber = 0,
		instalments = "",
		CVV = 0,
		errors,
		processState = ProcessPaymentStates.Proccess,
	} = useSelector((state: RootState) => state.payment);

	const { activeHamburger } = useSelector(
		(state: RootState) => state.hamburguer
	);

	const dispatch = useDispatch();

	const updatePaymentData = (paymentData: paymentState) => {
		dispatch(setPaymentData(paymentData));
		dispatch(setErrors(""));
	};

	const cancelPaymentForm = () => {
		// const form = document.getElementById("paymentForm");
		// form.reset();
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
			<div
				className={`pay-content ${
					processState == ProcessPaymentStates.Proccess
						? "active"
						: ""
				}`}
			>
				<h2>Amount to pay: ${totalPrice.toLocaleString("es-CO")}</h2>
				<h3>Name and lastname:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({ userName: e.target.value })
					}
					value={userName}
					type="text"
				/>
				<h3>Email:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({ email: e.target.value })
					}
					value={email}
					type="email"
				/>
				<h3>Phone number:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({
							phone: e.target.value,
						})
					}
					value={phone}
					type="tel"
				/>
				<h3>Card number:</h3>
				<div className="card-details">
					<input
						onChange={(e) =>
							updatePaymentData({
								card: e.target.value.replace(/\D/g, ""),
							})
						}
						type="tel"
						value={card
							.replace(/\D/g, "")
							.replace(/(\d{4})/g, "$1 ")
							.trim()}
						pattern="\d{4} \d{4} \d{4} \d{4}"
						autoComplete="cc-number"
						maxLength={24}
						placeholder="xxxx xxxx xxxx xxxx"
					/>
					{getCreditCardBrand(card)}
				</div>
				<div className="card-details">
					<h3>Expiration date:</h3>
					<h3>Security Code:</h3>
				</div>
				<div className="card-details">
					<div className="date-picker">
						<select
							defaultValue={expirationMonth}
							onChange={(e) =>
								updatePaymentData({
									expirationMonth: e.target.value
										? parseInt(e.target.value)
										: undefined,
								})
							}
						>
							<option value={0} disabled hidden>
								Month
							</option>
							{mothsList.map((index) => (
								<option value={index} key={index}>
									{index}
								</option>
							))}
						</select>
						<select
							defaultValue={expirationYear}
							onChange={(e) =>
								updatePaymentData({
									expirationYear: e.target.value
										? parseInt(e.target.value)
										: undefined,
								})
							}
						>
							<option disabled hidden value={0}>
								Year
							</option>
							{yearsList.map((index) => (
								<option value={index} key={index}>
									{index}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							onChange={(e) =>
								updatePaymentData({
									CVV: parseInt(
										e.target.value.replace(/\D/g, "")
									),
								})
							}
							type="tel"
							value={CVV || ""}
						/>
					</div>
				</div>
				<h3>Document Number:</h3>
				<div className="document">
					<select
						defaultValue={documentType}
						onChange={(e) =>
							updatePaymentData({
								documentType: e.target.value,
							})
						}
					>
						<option disabled value="">
							Type
						</option>
						{documentTypes.map((type) => (
							<option value={type} key={type}>
								{type.split("").join(".") + "."}
							</option>
						))}
					</select>
					<input
						onChange={(e) =>
							updatePaymentData({
								documentNumber: parseInt(
									e.target.value.replace(/\D/g, "")
								),
							})
						}
						value={documentNumber || ""}
						type="tel"
					/>
				</div>
				<h3>Number of instalments:</h3>
				<div className="quantity">
					<button onClick={() => dispatch(decrementInstalments())}>
						-
					</button>
					<p>{instalments}</p>
					<button onClick={() => dispatch(incrementInstalments())}>
						+
					</button>
				</div>
				<div className={`errors ${errors != "" ? "active" : ""}`}>
					<strong>{errors}</strong>
				</div>
			</div>
			<div
				className={`pay-content ${
					processState == ProcessPaymentStates.Confirm ? "active" : ""
				}`}
			>
				<h2>Confirm your data</h2>
				<h3>Document Number:</h3>
				<p>
					{documentType.split("").join(".") + ". " + documentNumber}
				</p>
				<h3>Full name:</h3>
				<p>{userName}</p>
				<h3>Email</h3>
				<p>{email}</p>
				<h3>Phone</h3>
				<p>{phone}</p>
				<h3>Credit Card:</h3>
				<p>
					{card
						.replace(/\D/g, "")
						.replace(/(\d{4})/g, "$1 ")
						.trim()}
				</p>
				<h3>Number of Instalments:</h3>
				<p>{instalments}</p>
				<h3>Total Price:</h3>
				<p>${totalPrice.toLocaleString("es-CO")}</p>
			</div>
			<div
				className={`pay-content ${
					processState == ProcessPaymentStates.Success ? "active" : ""
				}`}
			>
				<h1>Success Payment</h1>
				<p>
					Great, you successfully buy {quantity} bottle of Beenom
					pills, we hope that you enjoy it a lot, we will be in
					contact with you for future products
				</p>
			</div>
			<div
				className={`pay-content ${
					processState == ProcessPaymentStates.Fail ? "active" : ""
				}`}
			>
				<h1>Failed Payment</h1>
				<p>
					Wow, we find problems in the validation of your credit card,
					please check your data and try again
				</p>
			</div>
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
