import UserDAO from "../persistence/daos/UserDAO.js";
import UserDTO from "../persistence/dtos/UserDTO.js";
import UserFriendDTO from "../persistence/dtos/UserFriendDTO.js";

let userDAO = UserDAO.createInstance();

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const getUserById = await userDAO.findElementById(id);
        const user = new UserDTO(getUserById);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Error getting users", error: err.message });
    };
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDAO.findElementById(id);

        const friends = await Promise.all(
            user.friends.map((id) => userDAO.findElementById(id))
        );
        const formattedFriends = friends.map((friend) => new UserFriendDTO(friend));
        res.status(200).json(formattedFriends);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Error getting users", error: err.message });
    };
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await userDAO.findElementById(id);
        const friend = await userDAO.findElementById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        };

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => userDAO.findElementById(id))
        );
        const formattedFriends = friends.map((buddy) => new UserFriendDTO(buddy));
        res.status(200).json(formattedFriends);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Error updating users", error: err.message });
    };
};