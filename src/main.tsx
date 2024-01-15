import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<PersistGate persistor={persistor}>
			<Provider store={store}>
				<App />
			</Provider>
		</PersistGate>
	</React.StrictMode>
);
