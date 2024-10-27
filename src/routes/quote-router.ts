import passport from "passport";
import { Router } from "express";
import { newQuote, getQuotes } from "../controllers/quote-controller";

const router: Router = Router();

router.post(
  "/new-quote",
  passport.authenticate("jwt", { session: false }),
  newQuote
);
router.get("/get-quotes", getQuotes);

export default router;
