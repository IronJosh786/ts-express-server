import jwt from "jsonwebtoken";

export const createTokens = (userId: string, email: string) => {
  const accessToken = jwt.sign(
    { userId, email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! }
  );
  const refreshToken = jwt.sign(
    { userId, email },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (
  token: string,
  secret: string,
  ignoreExpiry: boolean = false
) => {
  return jwt.verify(token, secret, { ignoreExpiration: ignoreExpiry });
};
