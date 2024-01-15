import { useDispatch, useSelector } from "react-redux";
import "./Prices.css";
import { RootState } from "../../redux/store";
import {
	decrementQuantity,
	incrementQuantity,
	toggleOnPay,
	setPaymentData,
	paymentState,
	documentTypes,
} from "../../redux/paymentSlice";

function Prices() {
	const {
		quantity,
		totalPrice,
		onPay,
		email,
		userName,
		phone,
		card,
		expirationYear,
		expirationMonth,
		documentType,
		documentNumber,
		instalments,
	} = useSelector((state: RootState) => state.payment);

	const { activeHamburger } = useSelector(
		(state: RootState) => state.hamburguer
	);
	const dispatch = useDispatch();
	const lang: string = "es-CO";
	const totalPriceFormated = totalPrice.toLocaleString(lang);

	const mothsList = Array.from({ length: 12 }, (_, index) => index + 1);
	const yearsList = Array.from(
		{ length: 20 },
		(_, index) => index + new Date().getFullYear()
	);
	const updatePaymentData = (paymentData: paymentState) => {
		dispatch(setPaymentData(paymentData));
	};

	return (
		<div className={`prices ${onPay ? "active" : ""}`}>
			<div className={`pay-summary ${!onPay ? "active" : ""}`}>
				<h1>Prices</h1>

				<h3>Product name:</h3>
				<p>Beenom pills</p>
				<h3>Quantity:</h3>
				<div className="quantity">
					<button onClick={() => dispatch(decrementQuantity())}>
						-
					</button>
					<p>{quantity}</p>
					<button onClick={() => dispatch(incrementQuantity())}>
						+
					</button>
				</div>
				<h3>Total Price:</h3>

				<p>${totalPriceFormated}</p>

				<button onClick={() => dispatch(toggleOnPay())}>
					Pay with credit card
				</button>
			</div>
			<form
				className={`pay-data ${
					onPay && !activeHamburger ? "active" : ""
				}`}
			>
				<button
					className="close-button"
					onClick={() => dispatch(toggleOnPay())}
				>
					x
				</button>
				<h2>Amount to pay: ${totalPriceFormated}</h2>
				<h3>Email:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({ email: e.target.value })
					}
					value={email}
					type="email"
					required
				/>
				<h3>Name and lastname:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({ userName: e.target.value })
					}
					value={userName}
					type="text"
					required
				/>
				<h3>Phone number:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({ phone: e.target.value })
					}
					value={phone}
					type="tel"
					required
				/>
				<h3>Card number:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({
							card: e.target.value,
						})
					}
					type="tel"
					value={card}
					pattern="\d{4} \d{4} \d{4} \d{4}"
					autoComplete="cc-number"
					maxLength={19}
					placeholder="xxxx xxxx xxxx xxxx"
					required
				/>
				<div className="car-details">
					<h3>Expiration date:</h3>
					<h3>Security Code:</h3>
				</div>
				<div className="car-details">
					<div className="date-picker">
						<select
							onChange={(e) =>
								updatePaymentData({
									expirationMonth: e.target.value
										? parseInt(e.target.value)
										: null,
								})
							}
						>
							<option disabled selected={!expirationMonth} hidden>
								Month
							</option>
							{mothsList.map((index) => (
								<option
									value={index}
									selected={index == expirationMonth}
								>
									{index}
								</option>
							))}
						</select>
						<select
							onChange={(e) =>
								updatePaymentData({
									expirationYear: e.target.value
										? parseInt(e.target.value)
										: null,
								})
							}
						>
							<option disabled selected hidden>
								Year
							</option>
							{yearsList.map((index) => (
								<option
									value={index}
									selected={index == expirationYear}
								>
									{index}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							onChange={(e) =>
								updatePaymentData({
									CVV: parseInt(e.target.value),
								})
							}
							type="number"
							required
						/>
					</div>
				</div>
				<h3>Document Number:</h3>
				<div className="document">
					<select
						onChange={(e) =>
							updatePaymentData({
								documentType: e.target.value,
							})
						}
					>
						<option disabled selected hidden>
							Type
						</option>
						{documentTypes.map((type) => (
							<option value="type">
								{type.split("").join(".") + "."}
							</option>
						))}
					</select>
					<input
						onChange={(e) =>
							updatePaymentData({
								documentNumber: parseInt(e.target.value),
							})
						}
						value={documentNumber || ""}
						type="number"
						required
					/>
				</div>
				<h3>Number of instalments:</h3>
				<input
					onChange={(e) =>
						updatePaymentData({
							instalments: parseInt(e.target.value),
						})
					}
					value={instalments || ""}
					type="number"
					required
				/>
				<button onClick={() => dispatch(toggleOnPay())}>
					Complete
				</button>
			</form>
		</div>
	);
}

export default Prices;
