import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ObjectId } from "mongodb";
import clientPromise from "./_db.js";

const DB = process.env.MONGODB_DB ?? "nikah";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const col = client.db(DB).collection("greetings");

    if (req.method === "GET") {
      const docs = await col
        .find({ isAnonymous: { $ne: true } })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();
      const greetings = docs.map((d) => ({
        id: (d._id as ObjectId).toHexString(),
        name: d.name as string,
        message: d.message as string,
        colorIndex: d.colorIndex as number | undefined,
      }));
      return res.status(200).json(greetings);
    }

    if (req.method === "POST") {
      const { name, message, isAnonymous, colorIndex } = req.body as {
        name: string;
        message: string;
        isAnonymous: boolean;
        colorIndex?: number;
      };

      if (!name || !message) {
        return res.status(400).json({ error: "name and message are required" });
      }

      const doc = {
        name,
        message,
        isAnonymous,
        colorIndex,
        createdAt: new Date(),
      };
      const result = await col.insertOne(doc);
      return res.status(201).json({
        id: result.insertedId.toHexString(),
        name,
        message,
        colorIndex,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
