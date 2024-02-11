import { Grades } from "../infrastructure/database/interfaces/student-grades.type";
import { Student } from "../infrastructure/database/interfaces/students-table.type";
import PDFDocument from "pdfkit";
import SingletonWrapper from "../common/helpers/singleton-wrapper";
import { Response } from "express";

export interface IGeneratorCredentials
  extends Omit<Grades, "student_grades_id" | "student_id">,
    Omit<Student, "student_id" | "group_id"> {}

class PdfGeneratorService {
  public constructor() {}

  public async generate(credentials: IGeneratorCredentials, responseStream: Response) {
    const document = new PDFDocument();
    document.pipe(responseStream);

    document.fontSize(18).text("test", 100, 100);

    document.end();
  }
}

export const pdfGeneratorServiceSingleton = SingletonWrapper.makeSingleton(new PdfGeneratorService()).getInstance();
