import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v1 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';

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
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatVisible: Boolean = false;
  chat: ChatWindow;

  messagesCol: any;
  messages: any;
  channel: ChatChannel;
  messageDoc: AngularFirestoreDocument<ChatMessage>;
  message: Observable<ChatMessage>;

  title: string;
  text: string;

  constructor(private db: AngularFirestore, private authService: AuthService) {
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
      height: window.innerHeight - 40
    };

    this.initGlobalChat();
  }

  ngOnInit() {
    this.messagesCol = this.db.collection('messages');

    this.messages = this.messagesCol
    .snapshotChanges()
      .pipe(map(res => {
          return res.map(r => {
            const data = r.payload.doc.data() as ChatMessage;
            const id = r.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  toggleChat() {
    this.chat.visible ? this.chat.visible = false : this.chat.visible = true;
    if (this.chat.button.text === 'Open Chat' && this.chat.visible) {
      this.chat.button.text = 'Close Chat';
      this.chat.icon.prefix = 'far';
    } else if (this.chat.button.text === 'Close Chat' && !this.chat.visible) {
      this.chat.button.text = 'Open Chat';
      this.chat.icon.prefix = 'far';
    }
    console.log('toggleChat()');
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
