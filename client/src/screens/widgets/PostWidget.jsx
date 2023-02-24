import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import MyCommentWidget from "./MyCommentWidget";
import CommentWidget from "./CommentWidget";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    loggedUserId,
    isFirst
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const { userId } = useParams();

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };
    
    return (
        <WidgetWrapper m={ isFirst && userId && loggedInUserId !== userId ? null : "2rem 0" }>
            <Friend
                friendId={postUserId}
                postId={postId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                postIsFromUser={loggedUserId}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {
                picturePath && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`${process.env.REACT_APP_BASE_URL}/assets/${picturePath}`}
                    />
                )
            }
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                        {
                            isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )
                        }
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {
                isComments && (
                    <Box mt="0.5rem" display="flex" flexDirection="column">
                        <Box>
                            <MyCommentWidget postId={postId} userId={loggedInUserId} />
                        </Box>
                        {
                            comments.slice().reverse().map(({
                                _id,
                                postId,
                                userId,
                                text,
                                firstName,
                                lastName,
                                userPicturePath,
                                createdAt
                            }, i) => (
                                <CommentWidget 
                                    key={`${name} ${i}`}
                                    _id={_id}
                                    postId={postId}
                                    userId={userId} 
                                    text={text}
                                    firstName={firstName}
                                    lastName={lastName}
                                    userPicturePath={userPicturePath}
                                    createdAt={createdAt}
                                />
                            ))
                        }
                        <Divider />
                    </Box>
                )
            }
        </WidgetWrapper>
    );
};

export default PostWidget;