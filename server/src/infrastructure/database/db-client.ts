import { Database } from "./interfaces/db.types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const DbClient = new Kysely<Database>({ dialect });
