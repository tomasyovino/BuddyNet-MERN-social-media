import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import postRouter from "./post.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;