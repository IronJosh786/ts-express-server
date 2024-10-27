import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import passport from "passport";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { jwtStrategy } from "./middlewares/auth-middleware";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.APP_URL,
  })
);
app.use(router);

passport.use("jwt", jwtStrategy);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.use("/", (_req, res) => {
  res.send("This is a simple ts-express backend");
});

export default app;
