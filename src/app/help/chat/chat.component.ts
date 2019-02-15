import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOutDown, fadeInUp } from 'ng-animate';
import { AlertService } from 'src/app/services/alert.service';
import { IChatWindow } from 'src/app/interfaces/chat-window';
import { IChatMessage } from 'src/app/interfaces/chat-message';
import { ChatService } from 'src/app/services/chat.service';

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

  chat: IChatWindow;

  messages: any;
  message: Observable<IChatMessage>;

  text: string;

  constructor(private db: AngularFirestore,
              private authService: AuthService,
              private chatService: ChatService,
              public alertService: AlertService) {
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
    if (this.text !== '') {
      this.addMessage();
      this.text = '';
    } else {
      this.alertService.triggerAlert('warning', 'Nice try. Please enter a message, you cannot send whitespaces only.');
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
