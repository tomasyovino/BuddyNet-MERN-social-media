import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("No user is logged in");
            };
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => post._id === action.payload.post._id ? action.payload.post : post);
            state.posts = updatedPost;
        },
        setPostComments: (state, action) => {
            const { postId, comment } = action.payload;
            const updatedPosts = state.posts.map(post =>
                post._id === postId ? { ...post, comments: [...post.comments, comment] } : post
            );
            return { ...state, posts: updatedPosts };
        },
        deleteComment: (state, action) => {
            const { postId, commentId } = action.payload;

            const post = state.posts.find((post) => post._id === postId);
            if(post) {
                const updatedComments = post.comments.filter(
                    (comment) => comment._id !== commentId
                );
                post.comments = updatedComments;
            };
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setUser, setPosts, setPost, setPostComments, deleteComment } = authSlice.actions;
export default authSlice.reducer;