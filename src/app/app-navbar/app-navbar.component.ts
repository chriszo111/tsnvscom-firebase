import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { AppComponent } from '../app.component';
import { Sidebar } from 'ng-sidebar';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements AfterViewInit {

  isSidebarOpen: Boolean = false;

  constructor(public authService: AuthService,
              public router: Router,
              public readonly swalTargets: SwalPartialTargets,
              private appComponent: AppComponent) { }

  ngAfterViewInit() { }

  _toggleSidebar() {
    if (this.router.url !== '/home') {
      this.appComponent._opened = !this.appComponent._opened;
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
}
