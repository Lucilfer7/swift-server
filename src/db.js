import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Berserk-1969",
  port: 3306,
  database: "swift",
});
