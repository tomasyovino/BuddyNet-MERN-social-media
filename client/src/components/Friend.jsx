import { PersonAddOutlined, PersonRemoveOutlined, MoreVert } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Typography, CircularProgress, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state";
import FlexBetween from "./FlexBetween";
import ModalWidget from "screens/widgets/ModalWidget";
import UserImage from "./UserImage";

const Friend = ({ friendId, postId, name, subtitle, userPicturePath, postIsFromUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 400,
        bgcolor: palette.background.alt,
        border: `2px solid ${palette.background.alt}`,
        borderRadius: "12px",
        boxShadow: 24,
    };

    const deletePost = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/delete/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const posts = await response.json();
            console.log(posts)
            dispatch(setPosts({ posts }));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setOpen(false);
        };
    };

    const patchFriend = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${_id}/${friendId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    return(
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {
                postIsFromUser 
                    ? 
                        <>
                            <IconButton onClick={() => setOpen(true)}>
                                <MoreVert />
                            </IconButton>
                            <ModalWidget open={open} setOpen={setOpen}>
                                <Box sx={style}>
                                    {
                                        isLoading
                                            ?
                                                <Box display="flex" alignItems="center" justifyContent="center" padding= ".5rem 0">
                                                    <CircularProgress size="32px" />
                                                </Box>
                                            :
                                                <>
                                                    <Button 
                                                        sx={{ 
                                                            width: "100%", 
                                                            color: palette.neutral.error, 
                                                            "&:hover": { backgroundColor: "transparent" } 
                                                        }}
                                                        onClick={deletePost}
                                                    >
                                                        <Typography>Delete</Typography>
                                                    </Button>
                                                    <Divider sx={{ color: palette.neutral.light }} />
                                                    <Button 
                                                        sx={{ 
                                                            width: "100%", 
                                                            "&:hover": { backgroundColor: "transparent" } 
                                                        }}
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <Typography>Cancel</Typography>
                                                    </Button>
                                                </>
                                    }
                                </Box>
                            </ModalWidget>
                        </>
                    : 
                        <IconButton
                            onClick={() => patchFriend()}
                            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                        >
                            {
                                isFriend ? (
                                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                                ) : (
                                    <PersonAddOutlined sx={{ color: primaryDark }} />
                                )
                            }
                        </IconButton>
            }
        </FlexBetween>
    );
};

export default Friend;