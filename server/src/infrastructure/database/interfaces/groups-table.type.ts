import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface GroupsTable {
  group_id: Generated<string>;
  name: string;
}

export type Groups = Selectable<GroupsTable>;
export type NewGroups = Insertable<GroupsTable>;
export type GroupsUpdate = Updateable<GroupsTable>;
