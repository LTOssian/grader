import { Grades } from "../../infrastructure/database/interfaces/student-grades.type";

export const gradeDateFormattter = (credentials: Pick<Grades, "created_at">): string => {
  const day = credentials.created_at.getDate().toString().padStart(2, "0");
  const month = (credentials.created_at.getMonth() + 1).toString().padStart(2, "0");
  const year = credentials.created_at.getFullYear().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
};
