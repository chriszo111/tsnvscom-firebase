import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  chatVisible: Boolean = false;
  chat: any = {};

  constructor() {
    // Initialize chat
    this.chat = {
      visible: false,
      button: {
        text: 'Open Chat'
      },
      icon: {
        prefix: 'far',
        icon: 'comment-alt'
      }
    };
  }

  ngOnInit() {
  }

  toggleChat() {
    this.chat.visible ? this.chat.visible = false : this.chat.visible = true;
    if (this.chat.button.text === 'Open Chat' && this.chat.visible) {
      this.chat.button.text = 'Close Chat';
      this.chat.icon.prefix = 'fas';
    } else if (this.chat.button.text === 'Close Chat' && !this.chat.visible) {
      this.chat.button.text = 'Open Chat';
      this.chat.icon.prefix = 'far';
    }
  }
}
