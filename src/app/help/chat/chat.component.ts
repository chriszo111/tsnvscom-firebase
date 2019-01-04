import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v1 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOutDown, fadeInUp } from 'ng-animate';
import { ChatService, ChatWindow, ChatMessage } from 'src/app/services/chat.service';

interface Alert {
  active: boolean;
  type: string;
  title: string;
  message: string;
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

  chat: ChatWindow;
  alert: Alert;

  messages: any;
  message: Observable<ChatMessage>;

  text: string;

  constructor(private db: AngularFirestore,
              private authService: AuthService,
              private chatService: ChatService) {
    this.alert = {
      active: false,
      type: '',
      title: '',
      message: ''
    };
  }

  ngOnInit() {
    this.chat = this.chatService.getChat();
    this.messages = this.chatService.getMessages();
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
  }

  /**
   * When hitting enter within the chat input field,
   * the message add function is triggered
   * @param event The user keyboard input
   */
  onKeydown(event) {
    if (this.text.length > 0) {
      this.addMessage();
      this.text = '';
    }
  }

  addMessage() {
    if (!this.chatService.addMessage(this.text)) {
      // No auth, alert
    }
  }

  getMessage(messageId) {
    this.message = this.chatService.getMessage(messageId);

    if (this.message === null) {
      // No auth, alert
    }
  }

}
