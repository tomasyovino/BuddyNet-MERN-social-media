import { useSelector, useDispatch } from "react-redux";
import { Box, Button, CircularProgress, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import UserImage from "components/UserImage";
import { useState } from "react";
import ModalWidget from "./ModalWidget";
import { deleteComment } from "state";

const CommentWidget = ({
    _id,
    postId,
    userId,
    text,
    firstName,
    lastName,
    userPicturePath,
    createdAt
}) => {
    const [ open, setOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const dispatch = useDispatch();
    const loggedInUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();

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

    const deleteCommentHandler = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/comments`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId, commentId: _id }),
            });
            const data = await response.json();
            console.log(data);
            dispatch(deleteComment({ postId, commentId: _id }));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setOpen(false);
        };
    };

    return(
        <Box>
            <Divider />
            <Box display="flex" alignItems="center" justifyContent="flex-start" gap=".5rem">
                <UserImage image={userPicturePath} size="32px" />
                <Box 
                    sx={{ 
                        position: "relative",
                        width: "100%",
                        color: palette.neutral.main, 
                        m: "0.5rem 0 0 0", 
                        p: "1rem", 
                        backgroundColor: palette.neutral.light,
                        borderRadius: ".75rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px"
                    }}
                >
                    <Typography fontWeight="700">{firstName} {lastName}</Typography>
                    <Typography>{text}</Typography>
                    {
                        userId === loggedInUserId
                            ?
                                <>
                                    <IconButton 
                                        sx={{ 
                                            position: "absolute", 
                                            top: ".3rem", 
                                            right: ".3rem",
                                            cursor: "pointer"
                                        }} 
                                        onClick={() => setOpen(true)}
                                    >
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
                                                                sx={{ width: "100%", color: palette.neutral.error, "&:hover": { backgroundColor: "transparent" } }}
                                                                onClick={deleteCommentHandler}
                                                            >
                                                                <Typography>Delete</Typography>
                                                            </Button>
                                                            <Divider sx={{ color: palette.neutral.light }} />
                                                            <Button 
                                                                sx={{ width: "100%", "&:hover": { backgroundColor: "transparent" } }}
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                <Typography>Cancel</Typography>
                                                            </Button>
                                                        </>
                                            }
                                        </Box>
                                    </ModalWidget>
                                </>
                            : null
                    }
                </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end" mr="1rem" mb=".3rem">
                <Typography  sx={{ color: palette.neutral.main, fontSize: "12px" }}>{new Date(createdAt).toLocaleDateString('us-US')}</Typography>
            </Box>
        </Box>
    );
};

export default CommentWidget;