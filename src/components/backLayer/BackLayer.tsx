import BeenomIcon from "./../../assets/Beenom.svg";
import "./BackLayer.css";

interface props {
	hamActive: boolean;
	toggleHam: () => void;
	setItem: (item: string) => void;
}

function BackLayer({ hamActive, toggleHam, setItem }: props) {
	const updateItem = (item: string) => {
		setItem(item);
		toggleHam();
	};
	return (
		<div className={`back-layer ${hamActive ? "active" : ""}`}>
			<div className="menu">
				<div className="icon">
					<img src={BeenomIcon} alt="" />
					<h2>Beenom</h2>
				</div>
				<div
					className={`hambuger ${hamActive ? "active" : ""}`}
					onClick={toggleHam}
				>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div
				className={`hamburger-options ${hamActive ? "active" : ""}`}
				onClick={() => updateItem("History")}
			>
				<h2>History</h2>
			</div>
			<div
				className={`hamburger-options ${hamActive ? "active" : ""}`}
				onClick={() => updateItem("Product")}
			>
				<h2>Product</h2>
			</div>
			<div
				className={`hamburger-options ${hamActive ? "active" : ""}`}
				onClick={() => updateItem("Prices")}
			>
				<h2>Prices</h2>
			</div>
		</div>
	);
}

export default BackLayer;
