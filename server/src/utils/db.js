import mongoose from "mongoose";

const DBConnect = (mongoose_uri) => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoose_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database has been connected");
    } catch (err) {
        console.log(err)
    };
};

export { DBConnect };