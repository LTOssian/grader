import { gradeDateFormattter } from "../common/helpers/date-formatter";
import { Grades } from "../infrastructure/database/interfaces/student-grades.type";
import { mentionFormatter } from "../common/helpers/mention-formatter";
import { Response } from "express";
import { Student } from "../infrastructure/database/interfaces/students-table.type";
import PDFDocument from "pdfkit-table";

export interface IGeneratorCredentials
  extends Omit<Grades, "student_grades_id" | "student_id">,
    Omit<Student, "student_id" | "group_id"> {}

export interface ISimpleTable {
  title: string;
  headers: ["Matière", "Coefficient", "Note"];
  rows: Array<string[]>;
}

export interface ICompleteTable extends Omit<ISimpleTable, "headers"> {
  subtitle: string;
  headers: ["N°", "Matière", "Coefficient", "Note"];
}

export class PdfGeneratorService {
  public credentials: IGeneratorCredentials;
  public version?: "simple" | "complete";

  public constructor(credentials: IGeneratorCredentials, responseStream: Response, version?: "simple" | "complete") {
    this.credentials = credentials;
    this.version = version;

    this.initDocumentGeneration(responseStream);
  }

  /**
   *
   * @param res response stream
   */
  public async initDocumentGeneration(res: Response) {
    switch (this.version) {
      case "simple":
        await this.generateSimplePdf(res);
        break;
      case "complete":
        await this.generateCompletePdf(res);
        break;
      default:
        await this.generateSimplePdf(res);
    }
  }

  private async generateSimplePdf(responseStream: Response) {
    const document = new PDFDocument();
    document.pipe(responseStream);

    document.fontSize(12).text(`Bulletin de notes, version simple`, 64, 64);
    document.fontSize(18).text(`${this.credentials.firstname} ${this.credentials.lastname}`, 64, 64 + 12 + 12);

    const table: ISimpleTable = {
      title: "",
      headers: ["Matière", "Coefficient", "Note"],
      rows: [],
    };

    this.credentials.report.forEach((reportClass, index) => {
      table.rows.push([reportClass.class, reportClass.coefficient.toString(), reportClass.grade.toString()]);
    });

    await document.table(table);
    document.end();
  }

  private async generateCompletePdf(responseStream: Response) {
    const document = new PDFDocument();
    document.pipe(responseStream);

    document.fontSize(12).text(`Bulletin de notes, version complète`, 64, 64);
    document.moveDown();

    const table: ICompleteTable = {
      title: `${this.credentials.firstname} ${this.credentials.lastname}`,
      subtitle: `Réalisé le ${gradeDateFormattter({ created_at: this.credentials.created_at })}`,
      headers: ["N°", "Matière", "Coefficient", "Note"],
      rows: [],
    };

    this.credentials.report.forEach((reportClass, index) => {
      table.rows.push([
        index.toString(),
        reportClass.class,
        reportClass.coefficient.toString(),
        reportClass.grade.toString(),
      ]);
    });

    await document.table(table, {
      prepareHeader: () => document.fontSize(12),
      prepareRow: () => {
        return document.fontSize(12);
      },
    });

    document.moveDown();
    document.text(`Moyenne générale : ${this.credentials.grade}`);

    document.moveDown();
    document.text(`Mention : ${mentionFormatter(this.credentials.grade)}`);

    document.end();
  }
}
