import DAOContainer from "./DAOContainer.js";
import Post from "../../models/Post.js";

let instance = null;

class PostDAO extends DAOContainer {
    constructor() {
        super(Post);
    };

    static createInstance() {
        if (!instance) {
            instance = new PostDAO();
        };
        return instance;
    };

    async createPost(userId, firstName, lastName, location, description, userPicturePath, picturePath) {
        const newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            description,
            userPicturePath,
            picturePath,
            likes: {},
            comments: []
        });
        const savedPost = await newPost.save();

        return savedPost;
    };

    async getUserPosts(userId) {
        const posts = await Post.find({ userId });
        return posts;
    };

    async updatePost(id, likes) {
        const post = await Post.findByIdAndUpdate(
            id,
            { likes },
            { new: true }
        );
        return post;
    };

    async deleteCommentFromPost(postId, commentId) {
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        return post;
    };
};

export default PostDAO;