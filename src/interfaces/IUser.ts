interface IUser {
    email: string;
    name: string;
    password: string;
    address: string;
    contact: string;
    sex: number;
    birthdate: string;
}

// password is an optional property
// because we need password when posting user
// but we dont need password when getting user

export default IUser;
