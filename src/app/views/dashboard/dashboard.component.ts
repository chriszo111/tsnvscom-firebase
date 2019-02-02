import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AlertService } from 'src/app/services/alert.service';
import { UserProfile } from 'src/app/interfaces/user-profile';

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
  public files: UploadFile[] = [];
  userProfile: UserProfile;
  public userMessages: any;

  constructor(public authService: AuthService,
              private alertService: AlertService,
              private titleService: Title) { }

  async ngOnInit() {
    this.titleService.setTitle('Dashboard - Tensation Virtual Services - tsnvs.com');
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.userMessages = this.authService.getMessagesCurrentUser(this.authService.getUid());
  }

  updateUserProfile() {
    this.authService.updateUserProfile(this.userProfile, this.authService.userData.uid);
  }

  updateSettings(setting) {
    switch (setting) {
      case 'gravatar':
          this.userProfile.settings.preferGravatar = !this.userProfile.settings.preferGravatar;
        break;
      case 'dark':
        this.userProfile.settings.dark = !this.userProfile.settings.dark;
        break;
      case 'anonymous':
        this.userProfile.settings.anonymous = !this.userProfile.settings.anonymous;
        break;
    }

    this.authService.updateUserProfile(this.userProfile, this.authService.userData.uid);
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

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          if (this.authService.userData.uid === null) {
            this.alertService.triggerAlert('danger', 'Your user id could not be found.');
          }

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
