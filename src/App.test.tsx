import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "./redux/test-utils";
import App from "./App";

beforeAll(() => {
	renderWithProviders(<App />);
});

afterAll(() => {
	cleanup();
});

describe("App", () => {
	it("Render the App component and all the internal subcomponents", async () => {
		const backdrop = await screen.findByRole("Backdrop");
		const backLayer = await screen.findByRole("BackLayer");
		const frontLayer = await screen.findByRole("FrontLayer");

		expect(backdrop).not.toBeNull();
		expect(backLayer).not.toBeNull();
		expect(frontLayer).not.toBeNull();
	});

	it("Render title and de icon ", async () => {
		const appTitle = screen.getAllByText(/Beenom/i);
		const appIcon = await screen.findByAltText("Beenom icon");

		expect(appTitle.length).not.toBe(0);
		expect(appIcon).not.toBeNull();
	});
});
