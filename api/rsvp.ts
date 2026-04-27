import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./_db.js";

const DB = process.env.MONGODB_DB ?? "nikah";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, attendance, guests, message, isAnonymous, colorIndex } =
      req.body as {
        name: string;
        attendance: "yes" | "no";
        guests: number;
        message?: string;
        isAnonymous?: boolean;
        colorIndex?: number;
      };

    if (!name || !attendance || !guests || guests < 1) {
      return res
        .status(400)
        .json({ error: "name, attendance, and guests (≥1) are required" });
    }

    const client = await clientPromise;
    const db = client.db(DB);
    const rsvpCol = db.collection("rsvps");
    const greetingCol = db.collection("greetings");
    const now = new Date();

    if (message !== undefined) {
      // Mirror NestJS transaction: create greeting + rsvp atomically
      const session = client.startSession();
      try {
        session.startTransaction();

        const greetingResult = await greetingCol.insertOne(
          {
            name,
            message,
            isAnonymous,
            colorIndex,
            createdAt: now,
            updatedAt: now,
          },
          { session },
        );

        await rsvpCol.insertOne(
          {
            name,
            attendance,
            guests,
            greetingId: greetingResult.insertedId.toHexString(),
            createdAt: now,
            updatedAt: now,
          },
          { session },
        );

        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        throw err;
      } finally {
        await session.endSession();
      }
    } else {
      await rsvpCol.insertOne({
        name,
        attendance,
        guests,
        createdAt: now,
        updatedAt: now,
      });
    }

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
