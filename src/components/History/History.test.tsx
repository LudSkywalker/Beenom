import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../redux/test-utils";
import History from "./History";

beforeAll(() => {
	renderWithProviders(<History />);
});

afterAll(() => {
	cleanup();
});

describe("History", async () => {
	it("Render History component", async () => {
		const title = await screen.findByRole("title");
		expect(title.innerHTML).toContain("History");
	});
});
