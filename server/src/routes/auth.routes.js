import { Router } from "express";
import upload from "../middlewares/storage.js";
import * as authCtrl from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register", upload.single("picture"), authCtrl.registerUser);
authRouter.post("/login", authCtrl.login);

export default authRouter;