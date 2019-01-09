import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable()
export class AuthService {
  public userData: any;

  constructor(private afa: AngularFireAuth,
              private router: Router,
              public ngZone: NgZone,
              private alertService: AlertService,
              private db: AngularFirestore,
              private http: HttpClient) {
    this.afa.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signInWithEmailAndPassword(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.alertService.triggerAlert('warning', error.message);
      });
  }

  authLogin(provider) {
    return this.afa.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      this.setUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  signInWithFacebook() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  signUpWithEmailAndPassword(email, password) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.sendVerificationEmail();
      this.setUserData(result.user);
    }).catch((err) => {
      this.alertService.triggerAlert('danger', 'Oh snap! Something went wrong, the email could not be sent. Error: ' + err.message);
    });
  }

  sendVerificationEmail() {
    return this.afa.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.alertService.triggerAlert('success', 'Verification email sent. Please check your inbox!');
      this.router.navigate(['verify-email-address']);
    })
    .catch((err) => {
      this.alertService.triggerAlert('warning', 'Oh snap! Something went wrong, the email could not be sent. Error: ' + err.message);
    });
  }

  forgotPassword(passwordResetEmail) {
    return this.afa.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.alertService.triggerAlert('warning', 'Password reset email sent, check your inbox.');
    }).catch((err) => {
      this.alertService.triggerAlert('danger', 'Oh snap! Something went wrong, the email could not be sent. Error: ' + err.message);
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.email.verified !== false) {
      return true;
    } else {
      return false;
    }
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: {
        address: user.email,
        verified: user.emailVerified
      },
      address: {
        street: '',
        postcode: '',
        city: '',
        country: ''
      }
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  /**
   * Gets picture from Facebook with Graph API v3.2 cURL approach
   * (Needs a more generic solution to reduce being dependent on provider)
   */
  getPictureFromFacebook(): Promise<any> {
    this.db.collection('tokens').doc('fb').get().subscribe((doc) => {
      const photoId = this.afa.auth.currentUser.providerData[0].photoURL.split('/')[3];
      return this.http.get(`https://graph.facebook.com/v3.2/${photoId}/picture?access_token=${doc.data().token}`).toPromise();
    });

    return;
  }

  resendVerificationEmail() {
    this.afa.auth.currentUser.sendEmailVerification()
    .then((res) => {
      this.alertService.triggerAlert('success', 'Verification email sent. Please check your inbox!');
    })
    .catch((err) => {
      this.alertService.triggerAlert('warning', 'Oh snap! Something went wrong, the email could not be sent. Error: ' + err);
    });
  }

  getEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.email.verified;
  }

  getUid(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

  getName() {
    return JSON.parse(localStorage.getItem('user')).displayName;
  }

  logout() {
    return this.afa.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['/']);
    });
  }
}
