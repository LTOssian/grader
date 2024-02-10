import { Database } from "./interfaces/db.types";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import SingletonWrapper from "../../common/helpers/singleton-wrapper";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const DbClient = SingletonWrapper.makeSingleton(new Kysely<Database>({ dialect })).getInstance();
