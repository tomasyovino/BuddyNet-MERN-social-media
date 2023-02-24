import { useState } from "react";
import {
    Box,
    Button,
    InputBase,
    useTheme,
    CircularProgress
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPostComments } from "state";

const MyCommentWidget = ({ postId, userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ text, setText ] = useState("");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const handleComment = async () => {
        try {
            setIsLoading(true);
            const data = { postId, userId, text };
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/comments`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const comment = await response.json();
            dispatch(setPostComments({ postId, comment }));
        } catch (error) {
            console.log(error);
        } finally {
            setText("");
            setIsLoading(false);
        };
    };

    return(
        <Box position="relative" display="flex" alignItems="center" margin=".5rem 0">
            <InputBase 
                placeholder="Write a review..."
                onChange={(e) => setText(e.target.value)}
                value={text}
                multiline
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: ".7rem 1rem",
                }}
            />
            <Button 
                disabled={!text}
                onClick={handleComment}
                sx={{
                    right: "1rem",
                    position: "absolute",
                    p: ".3rem",
                    backgroundColor: "transparent",
                    "&:hover": { color: palette.primary.main, backgroundColor: "transparent", }
                }}
            >
                { isLoading ? <CircularProgress size="1rem" sx={{color: palette.primary.main}} /> : "Comment" }
            </Button>
        </Box>
    );
};

export default MyCommentWidget;