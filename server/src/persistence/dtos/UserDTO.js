class UserDTO {
    constructor(data) {
        this._id = data._id;
        this.fullName = `${data.firstName} ${data.lastName}`;
        this.email = data.email;
        this.picturePath = data.picturePath;
        this.friends = data.friends;
        this.location = data.location;
        this.occupation = data.occupation;
        this.viewedProfile = data.viewedProfile;
        this.impressions = data.impressions;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    };
};

export default UserDTO;
