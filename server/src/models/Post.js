import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
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
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            },
            postId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
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
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;