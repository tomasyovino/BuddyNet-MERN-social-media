class DAOContainer {
    constructor(collection) {
        this.collection = collection;
    };

    async findAllElements(query) {
        let elements;
        try {
            if(query) {
                elements = await this.collection.find().sort({ _id: -1 }).limit(3);
            } else {
                elements = await this.collection.find();
            }
            return elements;
        } catch (err) {
            console.log(err);
        };
    };

    async findElementById(id) {
        try {
            const element = await this.collection.findById(id);
            return element;
        } catch (err) {
            console.log(err)
        };
    };

    async updateElementById(id, obj) {
        try {
            const updatedElement = await this.collection.findByIdAndUpdate(id, {
                $set: obj
            }, { new: true });
            return updatedElement;
        } catch {
            console.log(err);
        };
    };

    async deleteElementById(id) {
        try {
            const deletedElement = await this.collection.findByIdAndDelete(id);
            return deletedElement;
        } catch (err) {
            console.log(err);
        };
    };
};

export default DAOContainer;