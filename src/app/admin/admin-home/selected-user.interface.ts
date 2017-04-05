export interface SelectedUser {
    _id?: String;
    emailAddress?: String;
    firstName: String;
    lastName: String;
    password?: String;
    dateOfBirth: String;
    gender: String;
    location: String;
    phoneNumber: String;
}

export interface IStats {
    institutions: Number;
    jobs: Number;
}
