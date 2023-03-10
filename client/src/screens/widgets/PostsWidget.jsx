import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const actualUserId = useSelector((state) => state.user._id)
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
  
    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };
  
    const getUserPosts = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };
  
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <>
            {
                posts.slice().reverse().map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }, index) => (
                        <PostWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                            loggedUserId={actualUserId === userId ? true : false}
                            isFirst={index === 0 ? true : false}
                        />
                    )
                )
            }
        </>
    );
};
  
export default PostsWidget;