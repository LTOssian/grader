import { describe, expect, it } from "@jest/globals";
import { gradeCalculatorServiceSingleton } from "../../src/service/grade-calculator.service";

describe("GradeCalculatorService", () => {
  const service = gradeCalculatorServiceSingleton;

  it("Should return a number with two decimal order", () => {
    const decimalOrder = 2;

    const result = service.calculateGrade({
      report: [
        {
          class: "1",
          coefficient: 1,
          grade: 3,
        },
        {
          class: "2",
          coefficient: 1,
          grade: 3,
        },
        {
          class: "3",
          coefficient: 1,
          grade: 4,
        },
      ],
    });

    expect(service.decimalOrder).toBe(decimalOrder);
    expect(result.toString().split(".")[1].length).toBe(decimalOrder);
  });

  it("Should return the correct grade", () => {
    const studentReport = [
      {
        class: "A",
        coefficient: 2,
        grade: 20,
      },
      {
        class: "B",
        coefficient: 2,
        grade: 10,
      },
      {
        class: "C",
        coefficient: 2,
        grade: 18,
      },
    ];
    const expectedGrade = 16;

    const result = service.calculateGrade({ report: studentReport });

    expect(result).toBe(expectedGrade);
  });
});
