import DAOContainer from "./DAOContainer.js";
import Comment from "../../models/Comment.js";

let instance = null;

class CommentDAO extends DAOContainer {
    constructor() {
        super(Comment);
    };

    static createInstance() {
        if (!instance) {
            instance = new CommentDAO();
        };
        return instance;
    };

    async createComment(postId, userId, text, firstName, lastName, userPicturePath) {
        const newComment = new Comment({
            postId,
            userId,
            text,
            firstName,
            lastName,
            userPicturePath,
            likes: {}
        });
        const savedComment = await newComment.save();

        return savedComment;
    };

    async updateComment(id, likes) {
        const comment = await Comment.findByIdAndUpdate(
            id,
            { likes },
            { new: true }
        );
        return comment;
    };
};

export default CommentDAO;