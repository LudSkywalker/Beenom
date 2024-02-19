import BeenomIcon from "./../../assets/Beenom.svg";
import "./BackLayer.css";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleHambuger, changeItem } from "../../redux/hamburguerSlice";

function BackLayer() {
	const activeHamburger = useSelector(
		(state: RootState) => state.hamburguer.activeHamburger
	);
	const dispatch = useDispatch();

	return (
		<div
			role="BackLayer"
			className={`back-layer ${activeHamburger ? "active" : ""}`}
		>
			<div className="menu">
				<div className="icon">
					<img src={BeenomIcon} alt="Beenom icon" />
					<h2>Beenom</h2>
				</div>
				<div
					role="hambuger"
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
				onClick={() => dispatch(changeItem("History"))}
				role="History"
			>
				<h2>History</h2>
			</div>
			<div
				className={`hamburger-options ${
					activeHamburger ? "active" : ""
				}`}
				onClick={() => dispatch(changeItem("Product"))}
				role="Product"
			>
				<h2>Product</h2>
			</div>
			<div
				className={`hamburger-options ${
					activeHamburger ? "active" : ""
				}`}
				onClick={() => dispatch(changeItem("Prices"))}
				role="Prices"
			>
				<h2>Prices</h2>
			</div>
		</div>
	);
}

export default BackLayer;
