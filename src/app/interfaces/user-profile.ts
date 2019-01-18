export interface UserProfile {
    steamID64?: string;
    address?: {
        street?: string;
        postcode?: string;
        city?: string;
        country?: string;
    };
    settings?: {
        anonymous?: boolean;
        dark?: boolean;
        preferGravatar?: boolean;
    };
}
