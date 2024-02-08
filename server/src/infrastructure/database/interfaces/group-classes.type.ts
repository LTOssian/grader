import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface GroupClassesTable {
  class_id: Generated<string>;
  group_id: string;
  name: string;
  coefficient: number;
}

export type GroupClasses = Selectable<GroupClassesTable>;
export type NewGroupClasses = Insertable<GroupClassesTable>;
export type GroupClassesUpdate = Updateable<GroupClassesTable>;
