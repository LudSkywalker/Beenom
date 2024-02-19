import { cleanup, screen } from "@testing-library/react";
import { it, describe, beforeAll, afterAll, expect } from "vitest";
import { renderWithProviders } from "../../../../../redux/test-utils";
import Fail from "./Fail";

beforeAll(() => {
	renderWithProviders(<Fail />);
});

afterAll(() => {
	cleanup();
});

describe("Fail", async () => {
	it("Render Fail component", async () => {
		const title = await screen.findAllByText(/Fail/i);

		expect(title.length).not.toBe(0);
	});

	it("Must appear try again in component text", async () => {
		const text = await screen.findAllByText(/try again/i);
		expect(text.length).not.toBe(0);
	});
});
