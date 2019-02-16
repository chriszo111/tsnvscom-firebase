export interface IUser {
    uid: string;
    email: {
        address: string;
        verified: boolean;
      };
    displayName: string;
    photoURL: string;
}
