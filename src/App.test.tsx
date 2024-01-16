import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll } from "vitest";
import { renderWithProviders } from "./redux/test-utils";
import App from "./App";

beforeAll(() => {
	renderWithProviders(<App />);
});

afterAll(() => {
	cleanup();
});

describe("App", () => {
	it("Render App component ", async () => {
		await screen.findByRole("Backdrop");
		await screen.findByRole("BackLayer");
		await screen.findByRole("FrontLayer");
	});
});
