import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

interface Badge {
  type: string;
  text: string;
  verified: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayName: Observable<string>;
  photoUrl: Observable<string>;

  constructor(public authService: AuthService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Dashboard - Tensation Virtual Services - tsnvs.com');
  }

  getEmailVerified(): Badge {
    if (this.authService.getEmailVerified()) {
      return { type: 'success', text: 'verified', verified: true };
    } else {
      return { type: 'danger', text: 'not verified', verified: false };
    }
  }

  resendVerificationEmail() {
    this.authService.sendVerificationEmail();
  }

}
