import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v1 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOutDown, fadeInUp } from 'ng-animate';

interface Alert {
  active: boolean;
  type: string;
  title: string;
  message: string;
}

interface ChatWindow {
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
}

interface ChatChannel {
  icon: {
    prefix: string;
    name: string;
  };
  name: string;
}

interface ChatMessage {
  authorName: string;
  message: string;
  timestamp: Date;
}

interface ChatMessageId extends ChatMessage {
  id: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('toggleChatAnmiation', [
      transition('* => fadeIn', useAnimation(fadeInUp)),
    ]),
    trigger('toggleChatAnmiation', [
      transition('fadeIn => fadeOut', useAnimation(fadeOutDown)),
    ])
  ]
})
export class ChatComponent implements OnInit {

  chatVisible: Boolean = false;
  chat: ChatWindow;
  alert: Alert;

  messagesRef: AngularFirestoreCollection<ChatMessage>;
  messages: any;
  channel: ChatChannel;
  messageDoc: AngularFirestoreDocument<ChatMessage>;
  message: Observable<ChatMessage>;

  title: string;
  text: string;

  toggleChatAnmiation: any;

  constructor(private db: AngularFirestore,
              private authService: AuthService) {
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
      closeButtonVisible: false
    };

    this.alert = {
      active: false,
      type: '',
      title: '',
      message: ''
    };

    this.initGlobalChat();
  }

  ngOnInit() {
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

  toggleCloseButton() {
    if (!this.chat.closeButtonVisible) {
      this.chat.closeButtonVisible = true;
    } else if (this.chat.closeButtonVisible) {
      this.chat.closeButtonVisible = false;
    }
  }

  toggleChat() {
    this.chat.visible ? this.chat.visible = false : this.chat.visible = true;
    if (this.chat.button.text === 'Open Chat' && this.chat.visible) {
      this.chat.button.text = 'Close Chat';
      this.chat.icon.prefix = 'far';
      this.toggleChatAnmiation = 'fadeOut';
    } else if (this.chat.button.text === 'Close Chat' && !this.chat.visible) {
      this.chat.button.text = 'Open Chat';
      this.chat.icon.prefix = 'far';
      this.toggleChatAnmiation = 'fadeIn';
    }
  }

  onKeydown(event) {
    if (this.text.length > 0) {
      this.addMessage();
      this.text = '';
    }
  }

  addMessage() {
    this.db.collection('messages').doc('msg-' + v1()).set({
      'timestamp': + new Date(), // https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
      'text': this.text,
      'author': this.authService.getName()
    })
    .catch((err) => {
      console.error(err);
    });
  }

  getMessage(messageId) {
    this.messageDoc = this.db.doc('messages/' + messageId);
    this.message = this.messageDoc.valueChanges();
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

}
