import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    const today = new Date().toISOString().split("T")[0];
    const result = await client.query(
      "SELECT * FROM daily_phrases WHERE data = $1",
      [today]
    );
    client.release();

    if (result.rows.length == 0) {
      res.status(404).json({ error: "No daily idiom found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
