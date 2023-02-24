import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userPicturePath: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;