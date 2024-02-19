import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../../../redux/test-utils";
import Confirm from "./Confirm";
import { store } from "../../../../../redux/store";

beforeAll(() => {
	renderWithProviders(<Confirm />);
});

afterAll(() => {
	cleanup();
});

describe("Confirm", async () => {
	it("Render Confirm component", async () => {
		const title = await screen.findAllByText(/Confirm/i);

		expect(title.length).not.toBe(0);
	});

	it("Must appear paymant data in component text", async () => {
		const {
			documentNumber,
			userName,
			email,
			phone,
			instalments,
			totalPrice = 0,
		} = store.getState().payment;

		[documentNumber, userName, email, phone, instalments].map(
			async (value) => {
				const text = await screen.findAllByText(
					RegExp(`${value}`, "i")
				);
				expect(text.length).not.toBe(0);
			}
		);

		const text = await screen.findAllByText(
			RegExp(`${totalPrice.toLocaleString("es-CO")}`, "i")
		);
		expect(text.length).not.toBe(0);
	});
});
