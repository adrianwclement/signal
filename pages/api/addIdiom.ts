import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "../../lib/db";
import { generateCipher, encodeMessage } from "lib/gameLogic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { phrase } = req.body;

  if (!phrase) {
    return res.status(400).json({ message: "Phrase is required" });
  }

  try {
    const client = await pool.connect();

    const insertIdiomQuery =
      "INSERT INTO idioms (phrase) VALUES ($1) RETURNING id";
    const idiomResult = await client.query(insertIdiomQuery, [phrase]);
    const idiomId = idiomResult.rows[0].id;

    const cipher = generateCipher();
    const encodedPhrase = encodeMessage(phrase, cipher);

    const insertDailyPhraseQuery = `
        INSERT INTO daily_phrases (date, encoded_phrase, original_phrase, cipher)
        VALUES (current_date, $1, $2, $3)
        ON CONFLICT (date) DO UPDATE SET encoded_phrase = EXCLUDED.encoded_phrase, original_phrase = EXCLUDED.original_phrase, cipher = EXCLUDED.cipher
    `;
    await client.query(insertDailyPhraseQuery, [
      encodedPhrase,
      phrase,
      JSON.stringify(cipher),
    ]);

    client.release();

    res
      .status(201)
      .json({ message: "Idiom added and daily phrase generated successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
