import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
});

type QueryResult = {
  rows: object[];
};

export const query = async (text: string) => {
  console.log(text);
  const res: QueryResult = await pool.query(text);
  return res;
};
