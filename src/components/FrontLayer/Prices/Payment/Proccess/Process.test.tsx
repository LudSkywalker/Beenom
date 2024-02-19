import { cleanup, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../../../redux/test-utils";
import Process from "./Process";
import { store } from "../../../../../redux/store";
import { documentTypes, paymentState } from "../../../../../redux/paymentSlice";
import dateList from "./dateList";

let user: UserEvent;

interface formData {
	role: string;
	placeholder?: string;
	storeValue: keyof paymentState;
	testData: string[];
}

beforeAll(() => {
	renderWithProviders(<Process />);
	user = userEvent.setup();
});

afterAll(() => {
	cleanup();
});

describe("Process", async () => {
	it("Render Process component", async () => {
		const title = await screen.findAllByText(/Amount to pay/i);

		expect(title.length).not.toBe(0);
	});

	const inputDataTest: formData[] = [
		{
			storeValue: "userName",
			role: "nameInput",
			placeholder: "Adrian",
			testData: ["Perez Pepito"],
		},
		{
			storeValue: "email",
			role: "emailInput",
			placeholder: "email@mail.com",
			testData: ["correo@mail.co"],
		},
		{
			storeValue: "phone",
			role: "phoneInput",
			placeholder: "3000000000",
			testData: ["3114115116"],
		},
		{
			storeValue: "card",
			role: "cardInput",
			placeholder: "xxxx xxxx xxxx xxxx",
			testData: ["4111111111111111"],
		},
		{
			storeValue: "CVV",
			role: "cvvInput",
			placeholder: "123",
			testData: ["321"],
		},
		{
			storeValue: "documentNumber",
			role: "docNumberInput",
			placeholder: "100100100",
			testData: ["123456789"],
		},
	];
	inputDataTest.map(
		async ({ testData, role, placeholder = "", storeValue }) => {
			testData.map(async (data) => {
				it(`Test input role ${role} data ${data}`, async () => {
					const input = await screen.findByPlaceholderText(
						RegExp(placeholder, "i")
					);
					await user.type(input, data);
					const storeVal = store
						.getState()
						.payment[storeValue]?.toString();
					expect(storeVal).toBe(data);
				});
			});
		}
	);

	const [mothsList, yearsList] = dateList();
	const selectDataTest: formData[] = [
		{
			storeValue: "expirationMonth",
			role: "monthInput",
			testData: mothsList,
		},
		{
			storeValue: "expirationYear",
			role: "yearInput",
			testData: yearsList,
		},
		{
			storeValue: "documentType",
			role: "docTypeInput",
			testData: documentTypes,
		},
	];
	selectDataTest.map(async ({ testData, role, storeValue }) => {
		testData.map(async (data) => {
			it(`Test select role ${role} data ${data}`, async () => {
				const select = await screen.findByRole(role);
				await user.selectOptions(select, data.toString());
				const storeVal = store
					.getState()
					.payment[storeValue]?.toString();
				expect(storeVal).toBe(data);
			});
		});
	});
});
