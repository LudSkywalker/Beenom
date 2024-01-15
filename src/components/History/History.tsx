import "./History.css";
import HistoryImg from "../../assets/history.jpg";

function History() {
	return (
		<div className={`history`}>
			<h1>History </h1>

			<img src={HistoryImg} alt="" />
			<p>
				Bee venom, used for its healing properties, has a rich history
				dating back to ancient civilizations. In the 19th century, Baron
				Jourdan developed a method for collecting bee venom without
				harming bees, paving the way for modern techniques involving
				specialized surfaces and electric stimulation.
			</p>
		</div>
	);
}

export default History;
