export interface User {
  userName: string;
  password: string;
}
export interface ProfileUser extends User {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
}

export interface RegisterUser extends User {
  email: string;
}
