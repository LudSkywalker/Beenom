import { it, describe, expect } from "vitest";
import dateList from "./dateList";

describe("dateList", async () => {
	describe("Get List of months and years", async () => {
		const [mothsList, yearsList] = dateList();

		it("Validation of monthsList ", async () => {
			expect(mothsList.length).toEqual(12);
			expect(mothsList[0]).toEqual("1");
			expect(mothsList[11]).toEqual("12");
		});

		it("Validation of yearsList ", async () => {
			expect(yearsList.length).toBeGreaterThan(10);
			expect(yearsList[0]).toEqual(new Date().getFullYear().toString());
			expect(yearsList[9]).toEqual(
				(new Date().getFullYear() + 9).toString()
			);
		});
	});
});
