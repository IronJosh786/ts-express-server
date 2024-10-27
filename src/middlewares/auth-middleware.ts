import { db } from "../db/index";
import { Request } from "express";
import { Strategy as JwtStrategy } from "passport-jwt";

const cookieExtractor = (req: Request) => {
  return req && req.cookies ? req.cookies.access_token : null;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
};

export const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
      },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
