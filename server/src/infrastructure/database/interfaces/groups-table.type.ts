import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface GroupsTable {
  group_id: Generated<string>;
  name: string;
}

export type Group = Selectable<GroupsTable>;
export type NewGroup = Insertable<GroupsTable>;
export type GroupUpdate = Updateable<GroupsTable>;
