import { ChatChannel } from './chat-channel';

export interface ChatWindow {
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
  channel: ChatChannel;
}
