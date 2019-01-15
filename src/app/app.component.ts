import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './services/alert.service';
import { Sidebar } from 'ng-sidebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public _opened: Boolean = false;

  constructor(public alertService: AlertService) {
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
