export interface IFigures {
  img?: {
    src?: string;
    alt?: string;
    picsumId?: number;
  },
  icon?: {
    name?: string;
    prefix?: string;
    size?: string;
  },
  title: string;
  caption: string;
  lastUpdate: Date;
}