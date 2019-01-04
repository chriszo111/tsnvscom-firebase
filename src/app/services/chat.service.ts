import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v1 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';

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

export interface ChatMessage {
  authorName: string;
  message: string;
  timestamp: Date;
}

interface ChatChannel {
  icon: {
    prefix: string;
    name: string;
  };
  name: string;
}

interface ChatMessageId extends ChatMessage {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chat: ChatWindow;

  messagesRef: AngularFirestoreCollection<ChatMessage>;
  messages: any;
  channel: ChatChannel;
  messageDoc: AngularFirestoreDocument<ChatMessage>;
  message: Observable<ChatMessage>;

  title: string;
  text: string;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    if (this.authService.isLoggedIn()) {
      this.initChat();
      this.initGlobalChat();
      this.initMessages();
    }
  }

  initChat() {
    // Initialize chat
    this.chat = {
      visible: false,
      button: {
        text: 'Open Chat'
      },
      icon: {
        prefix: 'far',
        name: 'comment-alt'
      },
      height: window.innerHeight - 40,
      closeButtonVisible: false,
      channel: this.channel
    };
  }

  initGlobalChat() {
    this.channel = {
        icon: {
          prefix: 'fas',
          name: 'globe'
        },
        name: 'global'
      };
  }

  initMessages() {
    this.messagesRef = this.db.collection('messages', ref => ref.orderBy('timestamp').limit(1000));

    this.messages = this.messagesRef
    .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(r => {
            const data = r.payload.doc.data() as ChatMessage;
            const id = r.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getChat() {
    if (this.authService.isLoggedIn()) {
      return this.chat;
    } else {
      return null;
    }
  }

  getMessages() {
    if (this.authService.isLoggedIn()) {
      return this.messages;
    } else {
      return null;
    }
  }

  /**
   * Add a new text message to the messages collection at Cloud Storage
   * @param text The message as string
   * @returns false if no authentication is given
   */
  addMessage(text: string): boolean {
    if (!this.authService.isLoggedIn()) {
      return false;
    }

    this.db.collection('messages').doc('msg-' + v1()).set({
      'timestamp': + new Date(), // https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
      'text': text,
      'author': this.authService.getName()
    })
    .catch((err) => {
      console.error(err);
    });
  }

  getMessage(messageId) {
    if (!this.authService.isLoggedIn()) {
      return null;
    }

    this.messageDoc = this.db.doc('messages/' + messageId);
    return this.messageDoc.valueChanges();
  }
}
