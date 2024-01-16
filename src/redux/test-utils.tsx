import { ReactElement, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import type { AppStore } from "./store";
import { store as appStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	store?: AppStore;
}

export function renderWithProviders(
	ui: ReactElement,
	{ store = appStore, ...renderOptions }: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren): JSX.Element {
		const persistor = persistStore(store);
		return (
			<PersistGate persistor={persistor}>
				<Provider store={store}>{children}</Provider>
			</PersistGate>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
