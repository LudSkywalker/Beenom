import "./FrontLayer.css";
import Product from "../Product/Product";
import History from "../History/History";
import Prices from "../Prices/Prices";
interface props {
	hamActive: boolean;
	activeItem: string;
}

function FrontLayer({ hamActive, activeItem }: props) {
	const itemList = {
		Product,
		History,
		Prices,
	};
	const Content = itemList[activeItem as keyof typeof itemList];
	return (
		<div className={`front-layer ${hamActive ? "inactive" : ""}`}>
			<Content />
		</div>
	);
}

export default FrontLayer;
