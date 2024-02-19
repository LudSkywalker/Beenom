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
	it("Render FrontLayer component and all the internal subcomponents", async () => {
		const frontLater = await screen.findByRole("FrontLayer");
		const content = await screen.findByRole("Content");

		expect(frontLater).not.toBeNull();
		expect(content).not.toBeNull();
	});

	const itemsList  = ["Product", "History", "Prices"];

	itemsList.map((item) => {
		it(`Show option ${item} from hamburger`, async () => {
			await store.dispatch(changeItem(item));
			await screen.findByText(item);
			const title = await screen.findByRole("title");

			expect(title.innerHTML).toContain(item);
		});
	});
});
