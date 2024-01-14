import { useState } from "react";
import BackLayer from "./components/backLayer/BackLayer";
import FrontLayer from "./components/FrontLayer/FrontLayer";
import "./App.css";

function App() {
	const [hamActive, setHam] = useState(false);

	const toggleHam = () => {
		setHam(!hamActive);
	};

	const [activeItem, setItem] = useState("Product");

	return (
		<div className="backdrop">
			<BackLayer
				hamActive={hamActive}
				toggleHam={toggleHam}
				setItem={setItem}
			/>
			<FrontLayer hamActive={hamActive} activeItem={activeItem} />
		</div>
	);
}

export default App;
