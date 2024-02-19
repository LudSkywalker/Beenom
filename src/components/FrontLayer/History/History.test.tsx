import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../redux/test-utils";
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

	it("Render history image", async () => {
		const img = await screen.findByAltText("History Img");

		expect(img).not.toBeNull();
	});

	it("Render history text", async () => {
		const description = await screen.queryAllByText(/Bee venom/i);

		expect(description.length).not.toBe(0);
	});
});
