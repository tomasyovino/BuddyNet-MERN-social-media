import { Router } from "express";
import * as userCtrl from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/:id", verifyToken, userCtrl.getUser);
userRouter.get("/:id/friends", verifyToken, userCtrl.getUserFriends);
userRouter.patch("/:id/:friendId", verifyToken, userCtrl.addRemoveFriend);

export default userRouter;