import { db } from "../db";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";

type User = {
  id: string;
  email: string;
};

export const newQuote = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || !text?.trim()) {
      return res.status(400).json({ message: "Text required!" });
    }

    const userRef = req.user as User;

    const newQuote = await db.randomQuotes.create({
      data: { text, userId: userRef.id },
    });
    return res
      .status(200)
      .json({ data: newQuote, message: "Created new quote" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export const getQuotes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const quotes = await db.randomQuotes.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!quotes || !quotes.length)
      return res.status(200).json({ data: [], message: "No quotes found" });
    return res.status(200).json({ data: quotes, message: "Quotes found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
