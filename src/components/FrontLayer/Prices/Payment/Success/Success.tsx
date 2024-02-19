import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { ProcessPaymentStates } from "../../../../../redux/paymentSlice";

function Success() {
	const { quantity = 0, processState = ProcessPaymentStates.Proccess } =
		useSelector((state: RootState) => state.payment);

	return (
		<div
			className={`pay-content ${
				processState == ProcessPaymentStates.Success ? "active" : ""
			}`}
		>
			<h1>Success Payment</h1>
			<p>
				Great, you successfully buy {quantity} bottle of Beenom pills,
				we hope that you enjoy it a lot, we will be in contact with you
				for future products
			</p>
		</div>
	);
}

export default Success;
