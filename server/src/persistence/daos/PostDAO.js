import DAOContainer from "./DAOContainer.js";
import Post from "../../models/Post.js";

let instance = null;

class PostDAO extends DAOContainer {
    constructor() {
        super(Post);
    };

    static createInstance() {
        if (!instance) {
            instance = new PostDAO();
        };
        return instance;
    };
};

export default PostDAO;