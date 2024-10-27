import { Router } from "express";
import AuthRouter from "./auth-router";
import RandomQuotesRouter from "./quote-router";

const router: Router = Router();

router.use("/api/auth", AuthRouter);
router.use("/api/quotes", RandomQuotesRouter);

export default router;
