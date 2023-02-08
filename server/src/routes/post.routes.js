import { Router } from "express";
import * as postCtrl from "../controllers/post.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import upload from "../middlewares/storage.js";

const postRouter = Router();

postRouter.post("/", verifyToken, upload.single("picture"), postCtrl.createPost);
postRouter.get("/", verifyToken, postCtrl.getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, postCtrl.getUserPosts);
postRouter.patch("/:id/like", verifyToken, postCtrl.likePost);

export default postRouter;