import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../../../redux/test-utils";
import Success from "./Success";
import { store } from "../../../../../redux/store";

beforeAll(() => {
	renderWithProviders(<Success />);
});

afterAll(() => {
	cleanup();
});

describe("Success", async () => {
	it("Render Success component", async () => {
		const title = await screen.findAllByText(/Success/i);

		expect(title.length).not.toBe(0);
	});

	it("Must appear quantity in component", async () => {
		const quantity = await store.getState().payment.quantity;
		const text = await screen.findAllByText(RegExp(`${quantity}`,"i"));
		expect(text.length).not.toBe(0);
	});
});
