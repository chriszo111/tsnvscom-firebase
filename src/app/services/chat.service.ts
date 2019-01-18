import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v1 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from './alert.service';
import { ChatWindow } from '../interfaces/chat-window';
import { ChatMessage } from '../interfaces/chat-message';
import { ChatChannel } from '../interfaces/chat-channel';



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

  constructor(private authService: AuthService,
              private db: AngularFirestore,
              private alertService: AlertService) {
    if (this.authService.isLoggedIn()) {
      this.initGlobalChat();
      this.initChat();
      this.initMessages();
    }
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

  initMessages() {
    this.messagesRef = this.db.collection('messages', ref => ref.orderBy('timestamp', 'desc').limit(1000));

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
      this.alertService.triggerAlert('danger', 'You are not logged in. Please login to view the chat!');
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
      this.alertService.triggerAlert('danger', 'You are not logged in. Please login to view the chat!');
      return false;
    }

    this.db.collection('messages').doc('msg-' + v1()).set({
      'timestamp': + new Date(), // https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
      'text': text,
      'author': this.authService.getName(),
      'authorId': this.authService.getUid()
    })
    .catch((err) => {
      this.alertService.triggerAlert('warning', 'Your message could not be sent. Error:\n' + err);
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
