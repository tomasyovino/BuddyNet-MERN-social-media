import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "screens/navbar";
import FriendListWidget from "screens/widgets/FriendListWidget";
import MyPostWidget from "screens/widgets/MyPostWidget";
import PostsWidget from "screens/widgets/PostsWidget";
import UserWidget from "screens/widgets/UserWidget";
import NotFoundUser404 from "./NotFoundUser404";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const actualUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUser(data);
                };
            } catch (error) {
                console.log(error)
            };
        };
        getUser();
    }, [token, userId]);

    if (!user) return <NotFoundUser404 />

    return(
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    {
                        actualUserId === userId
                            ? (
                                <>
                                    <MyPostWidget picturePath={user.picturePath} />
                                    <Box m="2rem 0" />
                                </>
                            )
                            : null
                    }
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;