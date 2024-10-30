import { db } from "../db";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { createTokens, verifyToken } from "../utils/jwt";

const cookieExpiryTimeInMS = parseInt(process.env.COOKIE_EXPIRY!);

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if ([email, password].some((field) => !field || !field?.trim())) {
      return res
        .status(400)
        .json({ message: "Email and Password fields are required!" });
    }

    email = email.trim();
    password = password.trim();

    const userExists = await db.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "Email already taken!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = createTokens(newUser.id, email);

    await db.user.update({
      where: { id: newUser.id },
      data: { refreshToken },
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: cookieExpiryTimeInMS,
    });

    return res
      .status(201)
      .json({ data: { email }, message: "Sign Up successful" });
  } catch (error) {
    console.log("Error in signUp ", error);
    return res
      .status(500)
      .json({ message: "Could not SignUp. Please try again!" });
  }
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if ([email, password].some((field) => !field || !field?.trim())) {
      return res
        .status(400)
        .json({ message: "Email and Password fields are required!" });
    }

    email = email.trim();
    password = password.trim();

    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const { accessToken, refreshToken } = createTokens(user.id, email);

    await db.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: cookieExpiryTimeInMS,
    });

    return res
      .status(200)
      .json({ data: { email }, message: "Sign In successful" });
  } catch (error) {
    console.log("Error in signIn ", error);
    return res
      .status(500)
      .json({ message: "Could not SignIn. Please try again!" });
  }
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const access_token = req?.cookies?.access_token;

      if (!access_token) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const decodedToken = verifyToken(
        access_token,
        process.env.ACCESS_TOKEN_SECRET!,
        true
      ) as JwtPayload;
      const user = await db.user.findUnique({
        where: { id: decodedToken.userId },
      });

      if (!user) {
        return res.status(404).json({ message: "Invalid token!" });
      }

      if (!user.refreshToken) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      try {
        verifyToken(
          user.refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as JwtPayload;
      } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const { accessToken, refreshToken } = createTokens(user.id, user.email);

      await db.user.update({
        where: { id: user.id },
        data: { refreshToken },
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: cookieExpiryTimeInMS,
      });

      return res.status(200).json({ message: "Token refresh successful" });
    } catch (error) {
      console.log("Error in refreshToken ", error);
      return res.status(500).json({ message: "Could not Refresh Token." });
    }
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const access_token = req.cookies?.access_token;

    if (!access_token) {
      return res.status(400).json({ message: "Already logged out" });
    }

    const decodedToken = verifyToken(
      access_token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    const user = await db.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await db.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 0,
    });

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.log("Error in logout ", error);
    return res.status(500).json({ message: "Could not log out." });
  }
});

export const authCheck = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ data: req.user, message: "Logged in!" });
});
