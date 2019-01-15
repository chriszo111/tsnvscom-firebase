export interface User {
    uid: string;
    email: {
        address: string;
        verified: boolean;
      };
    displayName: string;
    photoURL: string;
    steamID64?: string;
    address?: {
        street?: string;
        postcode?: string;
        city?: string;
        country?: string;
    };
    settings: {
        anonymous: boolean;
        dark: boolean;
        preferGravatar: boolean;
    };
}
