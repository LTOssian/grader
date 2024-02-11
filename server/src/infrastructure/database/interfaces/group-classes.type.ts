import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ClassesTable {
  class_id: Generated<string>;
  group_id: string;
  name: string;
  coefficient: number;
}

export type Classes = Selectable<ClassesTable>;
export type NewClasses = Insertable<ClassesTable>;
export type ClassesUpdate = Updateable<ClassesTable>;
