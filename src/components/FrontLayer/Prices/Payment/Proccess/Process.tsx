import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
	setPaymentData,
	paymentState,
	documentTypes,
	decrementInstalments,
	incrementInstalments,
	setErrors,
	ProcessPaymentStates,
} from "../../../../../redux/paymentSlice";
import { getCreditCardBrand } from "../CreditCardValidator";
import dateList from "./dateList";

const [mothsList, yearsList] = dateList();

function Process() {
	const {
		totalPrice = 0,
		email = "",
		userName = "",
		phone = "",
		card = "",
		expirationYear = 0,
		expirationMonth = 0,
		documentType = "",
		documentNumber = 0,
		instalments = 1,
		CVV = 0,
		errors,
		processState = ProcessPaymentStates.Proccess,
	} = useSelector((state: RootState) => state.payment);

	const dispatch = useDispatch();

	const updatePaymentData = (paymentData: paymentState) => {
		dispatch(setPaymentData(paymentData));
		if (errors != "") {
			dispatch(setErrors(""));
		}
	};

	return (
		<div
			className={`pay-content ${
				processState == ProcessPaymentStates.Proccess ? "active" : ""
			}`}
		>
			<h2>Amount to pay: ${totalPrice.toLocaleString("es-CO")}</h2>
			<h3>Name and lastname:</h3>
			<input
				role="nameInput"
				onChange={(e) =>
					updatePaymentData({ userName: e.target.value })
				}
				value={userName}
				type="text"
				placeholder="Adrian Fahrenheits Tepes"
			/>
			<h3>Email:</h3>
			<input
				role="emailInput"
				onChange={(e) => updatePaymentData({ email: e.target.value })}
				value={email}
				type="email"
				placeholder="email@mail.com"
			/>
			<h3>Phone number:</h3>
			<input
				role="phoneInput"
				onChange={(e) =>
					updatePaymentData({
						phone: e.target.value,
					})
				}
				value={phone}
				type="tel"
				placeholder="3000000000"
			/>
			<h3>Card number:</h3>
			<div className="card-details">
				<input
					role="cardInput"
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
						role="monthInput"
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
						role="yearInput"
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
						role="cvvInput"
						onChange={(e) =>
							updatePaymentData({
								CVV: parseInt(
									e.target.value.replace(/\D/g, "")
								),
							})
						}
						type="tel"
						value={CVV || ""}
						placeholder="123"
					/>
				</div>
			</div>
			<h3>Document Number:</h3>
			<div className="document">
				<select
					role="docTypeInput"
					defaultValue={documentType == "" ? "Type" : documentType}
					onChange={(e) =>
						updatePaymentData({
							documentType: e.target.value,
						})
					}
				>
					<option disabled hidden value="Type">
						Type
					</option>
					{documentTypes.map((type) => (
						<option value={type} key={type}>
							{type.split("").join(".") + "."}
						</option>
					))}
				</select>
				<input
					role="docNumberInput"
					onChange={(e) =>
						updatePaymentData({
							documentNumber: parseInt(
								e.target.value.replace(/\D/g, "")
							),
						})
					}
					value={documentNumber || ""}
					type="tel"
					placeholder="100100100"
				/>
			</div>
			<h3>Number of instalments:</h3>
			<div className="quantity">
				<button onClick={() => dispatch(decrementInstalments())}>
					-
				</button>
				<p role="instalments">{instalments}</p>
				<button onClick={() => dispatch(incrementInstalments())}>
					+
				</button>
			</div>
			<div
				role="errors"
				className={`errors ${errors != "" ? "active" : ""}`}
			>
				<strong>{errors}</strong>
			</div>
		</div>
	);
}

export default Process;
