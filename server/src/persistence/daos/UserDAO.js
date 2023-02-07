import DAOContainer from "./DAOContainer.js";
import User from "../../models/User.js";

let instance = null;

class UserDAO extends DAOContainer {
    constructor() {
        super(User);
    };

    static createInstance() {
        if (!instance) {
            instance = new UserDAO();
        };
        return instance;
    };

    async createNewUser(firstName, lastName, email, password, picturePath, friends, location, occupation) {
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        
        return savedUser;
    };

    async findUserByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    };
};

export default UserDAO;