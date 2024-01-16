import Visa from "../../assets/Visa.png";
import MasterCard from "../../assets/MasterCard.png";
import AmericanExpress from "../../assets/AmericanExpress.png";

export const getCreditCardBrand = (cardNumber: string): JSX.Element => {
	const cleanedCardNumber = cardNumber.replace(/\s/g, "");
	let src;
	if (/^4/.test(cleanedCardNumber)) {
		src = Visa;
	} else if (/^5[1-5]/.test(cleanedCardNumber)) {
		src = MasterCard;
	} else if (/^3[47]/.test(cleanedCardNumber)) {
		src = AmericanExpress;
	}
	if (src) {
		return <img src={src} alt="" role="card-icon" className="card-icon" />;
	}
	return (
		<h3 role="card-icon" className="card-icon">
			N/A
		</h3>
	);
};

export const isValidCreditCard = (cardNumber: string): boolean => {
	const cleanedCardNumber = cardNumber.replace(/\s/g, "");
	if (!/^\d+$/.test(cleanedCardNumber)) {
		return false;
	}
	let sum = 0;
	let double = false;
	for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
		let digit = parseInt(cleanedCardNumber.charAt(i), 10);
		if (double) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}
		sum += digit;
		double = !double;
	}
	return sum % 10 === 0 && sum > 0;
};
