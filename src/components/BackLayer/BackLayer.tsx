import BeenomIcon from "./../../assets/Beenom.svg";
import "./BackLayer.css";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleHambuger, chageItem } from "../../redux/hamburguerState";

function BackLayer() {
	const activeHamburger = useSelector(
		(state: RootState) => state.hamburguer.activeHamburger
	);
	const dispatch = useDispatch();

	return (
		<div className={`back-layer ${activeHamburger ? "active" : ""}`}>
			<div className="menu">
				<div className="icon">
					<img src={BeenomIcon} alt="" />
					<h2>Beenom</h2>
				</div>
				<div
					className={`hambuger ${activeHamburger ? "active" : ""}`}
					onClick={() => dispatch(toggleHambuger())}
				>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div
				className={`hamburger-options ${
					activeHamburger ? "active" : ""
				}`}
				onClick={() => dispatch(chageItem("History"))}
			>
				<h2>History</h2>
			</div>
			<div
				className={`hamburger-options ${
					activeHamburger ? "active" : ""
				}`}
				onClick={() => dispatch(chageItem("Product"))}
			>
				<h2>Product</h2>
			</div>
			<div
				className={`hamburger-options ${
					activeHamburger ? "active" : ""
				}`}
				onClick={() => dispatch(chageItem("Prices"))}
			>
				<h2>Prices</h2>
			</div>
		</div>
	);
}

export default BackLayer;
