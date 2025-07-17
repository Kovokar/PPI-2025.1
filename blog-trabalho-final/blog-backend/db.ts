import postgres, { type Sql } from "postgres";
require("dotenv").config();

const connectionString = process.env.DATABASE_URL || "";

const sql: Sql = postgres(connectionString || "", {
  ssl: false,
});

export default sql;
