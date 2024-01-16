import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../redux/test-utils";
import FrontLayer from "./FrontLayer";
import { store } from "../../redux/store";
import { changeItem } from "../../redux/hamburguerSlice";

beforeAll(() => {
	renderWithProviders(<FrontLayer />);
});

afterAll(() => {
	cleanup();
});

describe("FrontLayer", async () => {
	it("Render FrontLayer component", async () => {
		await screen.findByRole("FrontLayer");
	});

	it("Show options from hamburger", async () => {
		const itemsList = ["Product", "History", "Prices"];

		for (const item of itemsList) {
			await store.dispatch(changeItem(item));
			await screen.findByText(item);
			const title = await screen.findByRole("title");
			expect(title.innerHTML).toContain(item);
		}
	});
});
