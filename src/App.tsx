import BackLayer from "./components/BackLayer/BackLayer";
import FrontLayer from "./components/FrontLayer/FrontLayer";
import "./App.css";

function App() {
	return (
		<div className="backdrop">
			<BackLayer />
			<FrontLayer />
		</div>
	);
}

export default App;
