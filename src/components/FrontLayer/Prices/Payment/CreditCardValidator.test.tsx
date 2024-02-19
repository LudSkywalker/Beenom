import { cleanup, render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { getCreditCardBrand, isValidCreditCard } from "./CreditCardValidator";
const validCardList = [
	"4111111111111111",
	"371449635398431",
	"5555555555554444",
	"6011111111111117",
];

const invalidCardList = [
	"4111111111111121",
	"371449835398431",
	"5555558555554444",
	"6011111211111117",
	"1234123412341234",
];

describe("CreditCardValidator", async () => {
	describe("getCreditCardBrand", async () => {
		it("Validate if render ", async () => {
			for (const card of validCardList) {
				render(getCreditCardBrand(card));
				await screen.getByRole("card-icon");
				cleanup();
			}
		});
	});
	describe("isValidCreditCard", async () => {
		it("Validate if render ", async () => {
			for (const card of validCardList) {
				expect(isValidCreditCard(card)).toBe(true);
			}
			for (const card of invalidCardList) {
				expect(isValidCreditCard(card)).toBe(false);
			}
		});
	});
});
