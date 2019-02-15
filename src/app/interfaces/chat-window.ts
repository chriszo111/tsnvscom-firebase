import { IChatChannel } from './chat-channel';

export interface IChatWindow {
  visible: boolean;
  button: {
    text: string;
  };
  icon: {
    prefix: string;
    name: string;
  };
  height: number;
  closeButtonVisible: boolean;
  channel: IChatChannel;
}
