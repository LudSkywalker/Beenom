import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { ProcessPaymentStates } from "../../../../../redux/paymentSlice";

function Confirm() {
	const {
		totalPrice = 0,
		email = "",
		userName = "",
		phone = "",
		card = "",
		documentType = "",
		documentNumber = 0,
		instalments = 1,
		processState = ProcessPaymentStates.Proccess,
	} = useSelector((state: RootState) => state.payment);

	return (
		<div
			className={`pay-content ${
				processState == ProcessPaymentStates.Confirm ? "active" : ""
			}`}
		>
			<h2>Confirm your data</h2>
			<h3>Document Number:</h3>
			<p>{documentType.split("").join(".") + ". " + documentNumber}</p>
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
	);
}

export default Confirm;
