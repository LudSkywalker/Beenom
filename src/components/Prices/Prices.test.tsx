import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../redux/test-utils";
import Prices from "./Prices";

beforeAll(() => {
	renderWithProviders(<Prices />);
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

		await plus.click();
		await plus.click();
		testQuantity += 2;
		expect(parseInt(quantity.innerHTML)).toBe(testQuantity);

		await minus.click();
		testQuantity -= 1;
		expect(parseInt(quantity.innerHTML)).toBe(testQuantity);
	});
	it("Render payment modal", async () => {
		const payForm = await screen.findByRole("paymentForm");
		const [payBtn] = await screen.findAllByText(/Pay/i);
		expect(Array.from(payForm.classList)).not.toContain("active");
		await payBtn.click();
		expect(Array.from(payForm.classList)).toContain("active");
	});
});
