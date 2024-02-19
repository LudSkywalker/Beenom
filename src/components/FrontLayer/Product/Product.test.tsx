import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../redux/test-utils";
import Product from "./Product";

beforeAll(() => {
	renderWithProviders(<Product />);
});

afterAll(() => {
	cleanup();
});

describe("Product", async () => {
	it("Render Product component", async () => {
		const title = await screen.findByRole("title");
		
		expect(title.innerHTML).toContain("Product");
	});

	it("Render product image", async () => {
		const img = await screen.findByAltText("Product img");
		
		expect(img).not.toBeNull();
	});
});
