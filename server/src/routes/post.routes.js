import { Router } from "express";
import * as postCtrl from "../controllers/post.controllers.js";
import { verifyToken } from "../middlewares/auth.js";
import upload from "../middlewares/storage.js";

const postRouter = Router();

postRouter.post("/", verifyToken, upload.single("picture"), postCtrl.createPost);
postRouter.post("/comments", verifyToken, postCtrl.commentPost);
postRouter.get("/", verifyToken, postCtrl.getFeedPosts);
postRouter.get("/:userId/posts", verifyToken, postCtrl.getUserPosts);
postRouter.patch("/:id/like", verifyToken, postCtrl.likePost);
postRouter.delete("/delete/:id", verifyToken, postCtrl.deletePost);
postRouter.delete("/comments", verifyToken, postCtrl.deleteComment);

export default postRouter;