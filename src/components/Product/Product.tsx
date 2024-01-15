import "./Product.css";
import ProductImg from "../../assets/Product.svg";

function Product() {
	return (
		<div className={``}>
			<h1>Product</h1>
			<img src={ProductImg} alt="" />
			<div>
				<p>
					Bee venom pills is harness the therapeutic power of bee
					venom in convenient pill form.
				</p>
				<ul>
					<li>
						<strong>Pure and Potent:</strong> Extracted from
						carefully managed bee sources.
					</li>
					<li>
						<strong> Convenient Form: </strong>Easily incorporated
						into your daily routine.
					</li>
					<li>
						<strong> Natural Wellness: </strong>Traditionally
						associated with anti-inflammatory properties.
					</li>
				</ul>
				<p>
					<strong>Caution:</strong> Consult with a doctor before use,
					especially if allergic to bee stings.
				</p>
			</div>
		</div>
	);
}

export default Product;
