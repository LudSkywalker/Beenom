import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../redux/test-utils";
import BackLayer from "./BackLayer";
import { store } from "../../redux/store";

beforeAll(() => {
	renderWithProviders(<BackLayer />);
});

afterAll(() => {
	cleanup();
});

describe("BackLayer", async () => {
	let hamburgerBtn: HTMLElement;
	let history: HTMLElement;
	let product: HTMLElement;
	let prices: HTMLElement;

	it("Render BackLayer component", async () => {
		await screen.findByRole("BackLayer");
		hamburgerBtn = await screen.findByRole("hambuger");
		history = await screen.findByRole("History");
		product = await screen.findByRole("Product");
		prices = await screen.findByRole("Prices");
	});

	it("Click hamburger", async () => {
		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");

		await hamburgerBtn.click();

		expect(Array.from(history.classList)).toContain("active");
		expect(Array.from(product.classList)).toContain("active");
		expect(Array.from(prices.classList)).toContain("active");
	});

	it("Select each item", async () => {
		await history.click();
		expect(store.getState().hamburguer.activeItem).toBe("History");
		await product.click();
		expect(store.getState().hamburguer.activeItem).toBe("Product");
		await prices.click();
		expect(store.getState().hamburguer.activeItem).toBe("Prices");
	});
});
