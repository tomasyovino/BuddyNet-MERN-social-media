import PostDAO from "../persistence/daos/PostDAO.js";
import UserDAO from "../persistence/daos/UserDAO.js";

let postDAO = PostDAO.createInstance();
let userDAO = UserDAO.createInstance();

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await userDAO.findElementById(userId);
        await postDAO.createPost(userId, user.firstName, user.lastName, user.location, description, user.picturePath, picturePath);
         
        const posts = await postDAO.findAllElements();
        res.status(201).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Post creation error", error: err.message });
    };
};

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await postDAO.findAllElements();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Getting feeds error", error: err.message });
    };
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await postDAO.getUserPosts(userId);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Getting posts error", error: err.message });
    };
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await postDAO.findElementById(id);
        const isLiked = post.likes.get(userId);

        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

        const updatedPost = await postDAO.updatePost(id, post.likes);
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Updating posts error", error: err.message });
    };
};