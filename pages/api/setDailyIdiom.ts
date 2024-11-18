import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "../../lib/db";
import { generateCipher, encodeMessage } from "../../lib/gameLogic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    const originalPhrase = "random idiom here"; // TODO: fix
    const cipher = generateCipher();
    const encodedPhrase = encodeMessage(originalPhrase, cipher);
    const today = new Date().toISOString().split("T")[0];

    await client.query(
      "INSERT INTO daily_phrases (date, encoded_phrase, original_phrase, cipher) VALUES ($1, $2, $3, $4) ON CONFLICT (date) DO UPDATE SET encoded phrase = $2, original_phrase = $3, cipher = $4",
      [today, encodedPhrase, originalPhrase, JSON.stringify(cipher)]
    );
    client.release();

    res.status(200).json({ message: "Daily idiom set successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
