export interface User {
    uid: string;
    email: {
        address: string;
        verified: boolean;
      };
    displayName: string;
    photoURL: string;
}
