import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../redux/test-utils";
import BackLayer from "./BackLayer";
import { store } from "../../redux/store";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;
beforeAll(() => {
	renderWithProviders(<BackLayer />);
	user = userEvent.setup();
});

afterAll(() => {
	cleanup();
});

describe("BackLayer", async () => {
	let hamburgerBtn: HTMLElement;
	let history: HTMLElement;
	let product: HTMLElement;
	let prices: HTMLElement;

	it("Render BackLayer component and all the internal subcomponents", async () => {
		const backLayer = await screen.findByRole("BackLayer");
		hamburgerBtn = await screen.findByRole("hambuger");
		history = await screen.findByRole("History");
		product = await screen.findByRole("Product");
		prices = await screen.findByRole("Prices");

		expect(backLayer).not.toBeNull();
		expect(hamburgerBtn).not.toBeNull();
		expect(history).not.toBeNull();
		expect(product).not.toBeNull();
		expect(prices).not.toBeNull();
	});

	it("Click hamburger", async () => {
		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");

		await user.click(hamburgerBtn);

		expect(Array.from(history.classList)).toContain("active");
		expect(Array.from(product.classList)).toContain("active");
		expect(Array.from(prices.classList)).toContain("active");

		await user.click(hamburgerBtn);

		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");
	});

	it("Select each item", async () => {
		await user.click(hamburgerBtn);
		expect(Array.from(history.classList)).toContain("active");
		expect(Array.from(product.classList)).toContain("active");
		expect(Array.from(prices.classList)).toContain("active");

		await user.click(history);
		expect(store.getState().hamburguer.activeItem).toBe("History");
		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");

		await user.click(hamburgerBtn);
		expect(Array.from(history.classList)).toContain("active");
		expect(Array.from(product.classList)).toContain("active");
		expect(Array.from(prices.classList)).toContain("active");

		await user.click(product);
		expect(store.getState().hamburguer.activeItem).toBe("Product");
		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");

		await user.click(hamburgerBtn);
		expect(Array.from(history.classList)).toContain("active");
		expect(Array.from(product.classList)).toContain("active");
		expect(Array.from(prices.classList)).toContain("active");

		await user.click(prices);
		expect(store.getState().hamburguer.activeItem).toBe("Prices");
		expect(Array.from(history.classList)).not.toContain("active");
		expect(Array.from(product.classList)).not.toContain("active");
		expect(Array.from(prices.classList)).not.toContain("active");
	});
});
