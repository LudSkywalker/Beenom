import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { ProcessPaymentStates } from "../../../../../redux/paymentSlice";

function Fail() {
	const { processState = ProcessPaymentStates.Proccess } = useSelector(
		(state: RootState) => state.payment
	);

	return (
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
	);
}

export default Fail;
