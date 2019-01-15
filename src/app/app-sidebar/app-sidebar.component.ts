import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {


  constructor(public authService: AuthService,
              public router: Router,
              private appComponent: AppComponent) { }

  ngOnInit() {
  }

  _toggleSidebar() {
    this.appComponent._opened = !this.appComponent._opened;
  }

}
