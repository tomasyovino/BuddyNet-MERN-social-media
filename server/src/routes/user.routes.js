import { Router } from "express";
import * as userCtrl from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import upload from "../middlewares/storage.js";

const userRouter = Router();

userRouter.get("/:id", verifyToken, userCtrl.getUser);
userRouter.get("/:id/friends", verifyToken, userCtrl.getUserFriends);
userRouter.patch("/:id/:friendId", verifyToken, userCtrl.addRemoveFriend);
userRouter.put('/:id', [upload.single('picture')], userCtrl.updateUserById);

export default userRouter;