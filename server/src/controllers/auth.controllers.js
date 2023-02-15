import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserDAO from "../persistence/daos/UserDAO.js";
import UserDTO from "../persistence/dtos/UserDTO.js";
import config from "../utils/config.js";

let userDAO = UserDAO.createInstance();

export const registerUser = async (req, res) => {
    try {
        let { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        if(!picturePath) picturePath = "people.png";

        const newUser = await userDAO.createNewUser(firstName, lastName, email, passwordHash, picturePath, friends, location, occupation);

        const user = new UserDTO(newUser);

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: User registration error", error: err.message });
    };
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const gettedUser = await userDAO.findUserByEmail(email);

        if(!gettedUser) return res.status(404).json({ message: "Invalid e-mail address" });

        const isMatch = await bcrypt.compare(password, gettedUser.password);
        if(!isMatch) return res.status(404).json({ message: "Invalid password" });

        const token = jwt.sign({ id: gettedUser._id }, config.jwt_secret, {
            expiresIn: "3d"
        });

        const user = new UserDTO(gettedUser);
        res.status(200).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: Error getting user", error: err.message });
    };
};