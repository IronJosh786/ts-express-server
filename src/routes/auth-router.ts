import passport from "passport";
import { Router } from "express";
import {
  authCheck,
  logout,
  refreshToken,
  signIn,
  signUp,
} from "../controllers/auth-controller";

const router: Router = Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/refresh-token", refreshToken);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);
router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  authCheck
);

export default router;
