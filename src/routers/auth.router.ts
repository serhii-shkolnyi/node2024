import { Router } from "express";

import { authController } from "../controllers";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/refresh", authController.refresh);
export const authRouter = router;
