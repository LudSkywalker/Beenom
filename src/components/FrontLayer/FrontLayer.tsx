import "./FrontLayer.css";
import Product from "../Product/Product";
import History from "../History/History";
import Prices from "../Prices/Prices";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

function FrontLayer() {
	const activeHamburger = useSelector(
		(state: RootState) => state.hamburguer.activeHamburger
	);
	const activeItem = useSelector(
		(state: RootState) => state.hamburguer.activeItem
	);

	const itemList = {
		Product,
		History,
		Prices,
	};
	const Content = itemList[activeItem as keyof typeof itemList];
	return (
		<div className={`front-layer ${activeHamburger ? "inactive" : ""}`}>
			<Content />
		</div>
	);
}

export default FrontLayer;
