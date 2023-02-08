class UserFriendDTO {
    constructor(data) {
        this._id = data._id;
        this.fullName = `${data.firstName} ${data.lastName}`;
        this.occupation = data.occupation;
        this.location = data.location;
        this.picturePath = data.picturePath;
    };
};

export default UserFriendDTO;
