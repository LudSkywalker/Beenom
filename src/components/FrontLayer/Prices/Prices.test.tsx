import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../redux/test-utils";
import { store } from "../../../redux/store";
import Prices from "./Prices";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;
beforeAll(() => {
	renderWithProviders(<Prices />);
	user = userEvent.setup();
});

afterAll(() => {
	cleanup();
});

describe("Prices", async () => {
	it("Render Prices component", async () => {
		const title = await screen.findByRole("title");
		expect(title.innerHTML).toContain("Prices");
	});

	it("Increment and decrement product quantity", async () => {
		const quantity = await screen.findByRole("quantity");
		const [plus] = await screen.findAllByText("+");
		const [minus] = await screen.findAllByText("-");
		let testQuantity: number = parseInt(quantity.innerHTML);

		expect(parseInt(quantity.innerHTML)).toBe(testQuantity);
		expect(store.getState().payment.quantity).toBe(testQuantity);

		await user.click(plus);
		await user.click(plus);
		testQuantity += 2;
		expect(parseInt(quantity.innerHTML)).toBe(testQuantity);
		expect(store.getState().payment.quantity).toBe(testQuantity);

		await user.click(minus);
		testQuantity -= 1;
		expect(parseInt(quantity.innerHTML)).toBe(testQuantity);
		expect(store.getState().payment.quantity).toBe(testQuantity);
	});

	it("Render payment modal", async () => {
		const payForm = await screen.findByRole("paymentForm");
		const [payBtn] = await screen.findAllByText(/Pay/i);

		expect(Array.from(payForm.classList)).not.toContain("active");
		await user.click(payBtn);
		expect(Array.from(payForm.classList)).toContain("active");
	});
});
