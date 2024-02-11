import SingletonWrapper from "../common/helpers/singleton-wrapper";
import { Grades } from "../infrastructure/database/interfaces/student-grades.type";

class GradeCalculatorService {
  public readonly decimalOrder = 2;

  public constructor() {}

  public calculateGrade({ report }: Pick<Grades, "report">): number {
    const totalGrade = report.reduce((acc, curr) => acc + Number(curr.grade) * Number(curr.coefficient), 0);
    const totalCoeff = report.reduce((acc, curr) => acc + Number(curr.coefficient), 0);

    const averageGrade = totalGrade / totalCoeff;

    return Number(averageGrade.toFixed(this.decimalOrder));
  }
}

export const gradeCalculatorServiceSingleton = SingletonWrapper.makeSingleton(
  new GradeCalculatorService()
).getInstance();
