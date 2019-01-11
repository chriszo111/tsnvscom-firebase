import { GravatarConfig, FALLBACK, RATING } from 'ngx-gravatar';

export const gravatarConfig: GravatarConfig = {
    fallback: FALLBACK.robohash,
    rating: RATING.x,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 1)',
    hasBorder: true,
    round: true,
    preferGravatar: false,
    size: 150
};
