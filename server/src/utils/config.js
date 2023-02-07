import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 3001,
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET
};

export default config;