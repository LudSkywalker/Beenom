import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../../redux/test-utils";
import Payment from "./Payment";
import {
	setPaymentData,
	toggleOnPay,
	ProcessPaymentStates,
} from "../../../../redux/paymentSlice";
import { store } from "../../../../redux/store";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;
beforeAll(() => {
	renderWithProviders(<Payment />);
	user = userEvent.setup();
});

afterAll(() => {
	cleanup();
});

describe("Payment", async () => {
	let closeBtn: HTMLElement;
	let nameInput: HTMLInputElement;
	let emailInput: HTMLInputElement;
	let phoneInput: HTMLInputElement;
	let cardInput: HTMLInputElement;
	let monthInput: HTMLInputElement;
	let yearInput: HTMLInputElement;
	let cvvInput: HTMLInputElement;
	let docTypeInput: HTMLInputElement;
	let docNumberInput: HTMLInputElement;

	it("Render Payment component", async () => {
		closeBtn = await screen.findByText("x");
		nameInput = await screen.findByRole("nameInput");
		emailInput = await screen.findByRole("emailInput");
		phoneInput = await screen.findByRole("phoneInput");
		cardInput = await screen.findByRole("cardInput");
		monthInput = await screen.findByRole("monthInput");
		yearInput = await screen.findByRole("yearInput");
		cvvInput = await screen.findByRole("cvvInput");
		docTypeInput = await screen.findByRole("docTypeInput");
		docNumberInput = await screen.findByRole("docNumberInput");
	});

	it("Activate modal", async () => {
		const payForm = await screen.findByRole("paymentForm");
		expect(Array.from(payForm.classList)).not.toContain("active");

		await store.dispatch(toggleOnPay());

		expect(Array.from(payForm.classList)).toContain("active");
	});

	it("Success flow", async () => {
		const continueBtn = await screen.findByText(/Continue/i);
		const errors = await screen.findByRole("errors");
		expect(nameInput.value).toBe("");
		expect(emailInput.value).toBe("");
		expect(phoneInput.value).toBe("");
		expect(cardInput.value).toBe("");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("");
		expect(errors.innerText).toBe("");

		await user.click(continueBtn);
		expect(errors.innerText).not.toBe("");
		expect(errors.innerText).toContain("Error");

		await store.dispatch(
			setPaymentData({
				userName: "Abcd123",
				email: "mail@mail.mail",
				phone: "12345678",
				card: "4111111111111111",
				expirationYear: 6,
				expirationMonth: new Date().getFullYear() + 2,
				CVV: 123,
				documentType: "CC",
				documentNumber: 100020000,
			})
		);

		expect(nameInput.value).toBe("Abcd123");
		expect(emailInput.value).toBe("mail@mail.mail");
		expect(phoneInput.value).toBe("12345678");
		expect(cardInput.value).toBe("4111 1111 1111 1111");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("123");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("100020000");

		await user.click(continueBtn);
		expect(errors.innerText).toBe("");
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Confirm
		);

		const confirmBtn = await screen.findByText(/Confirm and Pay/i);
		await user.click(confirmBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Success
		);

		await user.click(closeBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Proccess
		);
	});

	it("Fail flow", async () => {
		const continueBtn = await screen.findByText(/Continue/i);
		const errors = await screen.findByRole("errors");
		expect(nameInput.value).toBe("");
		expect(emailInput.value).toBe("");
		expect(phoneInput.value).toBe("");
		expect(cardInput.value).toBe("");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("");
		expect(errors.innerText).toBe("");

		await user.click(continueBtn);
		expect(errors.innerText).not.toBe("");
		expect(errors.innerText).toContain("Error");

		await store.dispatch(
			setPaymentData({
				userName: "Abcd123",
				email: "mail@mail.mail",
				phone: "12345678",
				card: "4111111111111121",
				expirationYear: 6,
				expirationMonth: new Date().getFullYear() + 2,
				CVV: 123,
				documentType: "CC",
				documentNumber: 100020000,
			})
		);

		expect(nameInput.value).toBe("Abcd123");
		expect(emailInput.value).toBe("mail@mail.mail");
		expect(phoneInput.value).toBe("12345678");
		expect(cardInput.value).toBe("4111 1111 1111 1121");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("123");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("100020000");

		await user.click(continueBtn);
		expect(errors.innerText).toBe("");
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Confirm
		);

		const confirmBtn = await screen.findByText(/Confirm and Pay/i);
		await user.click(confirmBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Fail
		);

		await user.click(closeBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Proccess
		);
	});

	it("Edit flow", async () => {
		const continueBtn = await screen.findByText(/Continue/i);
		const errors = await screen.findByRole("errors");
		expect(nameInput.value).toBe("");
		expect(emailInput.value).toBe("");
		expect(phoneInput.value).toBe("");
		expect(cardInput.value).toBe("");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("");
		expect(errors.innerText).toBe("");

		await user.click(continueBtn);
		expect(errors.innerText).not.toBe("");
		expect(errors.innerText).toContain("Error");

		await store.dispatch(
			setPaymentData({
				userName: "Abcd123",
				email: "mail@mail.mail",
				phone: "12345678",
				card: "4111111111111121",
				expirationYear: 6,
				expirationMonth: new Date().getFullYear() + 2,
				CVV: 123,
				documentType: "CC",
				documentNumber: 100020000,
			})
		);

		expect(nameInput.value).toBe("Abcd123");
		expect(emailInput.value).toBe("mail@mail.mail");
		expect(phoneInput.value).toBe("12345678");
		expect(cardInput.value).toBe("4111 1111 1111 1121");
		expect(monthInput.value).toBe("0");
		expect(yearInput.value).toBe("0");
		expect(cvvInput.value).toBe("123");
		expect(docTypeInput.value).toBe("Type");
		expect(docNumberInput.value).toBe("100020000");

		await user.click(continueBtn);
		expect(errors.innerText).toBe("");
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Confirm
		);

		let editBtn = await screen.findByText(/Edit info/i);
		await user.click(editBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Proccess
		);

		await user.click(continueBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Confirm
		);

		let confirmBtn = await screen.findByText(/Confirm and Pay/i);
		await user.click(confirmBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Fail
		);

		editBtn = await screen.findByText(/Edit info/i);
		await user.click(editBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Proccess
		);

		await store.dispatch(
			setPaymentData({
				card: "4111111111111111",
			})
		);
		expect(cardInput.value).toBe("4111 1111 1111 1111");

		await user.click(continueBtn);
		expect(errors.innerText).toBe("");
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Confirm
		);

		confirmBtn = await screen.findByText(/Confirm and Pay/i);
		await user.click(confirmBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Success
		);

		await user.click(closeBtn);
		expect(store.getState().payment.processState).toBe(
			ProcessPaymentStates.Proccess
		);
	});

	it("Increment and decrement product instalments", async () => {
		const instalments = await screen.findByRole("instalments");
		const [plus] = await screen.findAllByText("+");
		const [minus] = await screen.findAllByText("-");
		let testQuantity: number = parseInt(instalments.innerHTML);
		expect(parseInt(instalments.innerHTML)).toBe(testQuantity);
		await user.click(plus);
		await user.click(plus);
		testQuantity += 2;
		expect(parseInt(instalments.innerHTML)).toBe(testQuantity);
		await user.click(minus);
		testQuantity -= 1;
		expect(parseInt(instalments.innerHTML)).toBe(testQuantity);
	});
});
