import { useDispatch, useSelector } from "react-redux";
import "./Prices.css";
import { RootState } from "../../redux/store";
import {
	decrementQuantity,
	incrementQuantity,
	toggleOnPay,
} from "../../redux/paymentSlice";
import Payment from "../Payment/Payment";

function Prices() {
	const {
		quantity,
		totalPrice = 0,
		onPay,
	} = useSelector((state: RootState) => state.payment);

	const dispatch = useDispatch();

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

				<p>${totalPrice.toLocaleString("es-CO")}</p>

				<button onClick={() => dispatch(toggleOnPay())}>
					Pay with credit card
				</button>
			</div>
			<Payment></Payment>
		</div>
	);
}

export default Prices;
