import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { UserProfile } from '../interfaces/user-profile';

@Injectable()
export class AuthService {
  public userData: any;
  public userProfile: any;

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
        localStorage.setItem('profile', null);
        JSON.parse(localStorage.getItem('user'));
        JSON.parse(localStorage.getItem('profile'));
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
        this.setUserProfile(result.user);
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
      this.setUserProfile(result.user);
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
      this.setUserProfile(result.user);
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
      }
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  setUserProfile(user) {
    const userProfileCol: AngularFirestoreCollection = this.db.collection('profiles');
    const userProfileRef: AngularFirestoreDocument<UserProfile> = userProfileCol.doc(user.uid);

    userProfileRef.ref.get()
      .then((doc) => {
        localStorage.setItem('profile', JSON.stringify(doc.data()));
        JSON.parse(localStorage.getItem('profile'));

        return userProfileRef.set(doc.data(), {
          merge: true
        });
      })
      .catch((err) => { // User exists but not profile, so first login
        this.userProfile = {
          steamID64: '',
          address: {
              street: '',
              postcode: '',
              city: '',
              country: ''
          },
          settings: {
              anonymous: false,
              dark: true,
              preferGravatar: false
          }
        };

      return userProfileRef.set(this.userProfile, {
        merge: true
      });
    });
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

  updateUserProfile(profile, uid) {
    const userProfileRef: AngularFirestoreDocument<UserProfile> = this.db.collection('profiles').doc(uid);
    userProfileRef.update(profile)
    .then(() => {
      this.alertService.triggerAlert('success', 'Profile updated successfully!');
    })
    .catch((err) => {
      this.alertService.triggerAlert('warning', 'Something went wrong while updating your profile.');
    });
  }

  getMessagesCurrentUser() {
    const query = this.db.collection('messages', ref => ref.where('authorId', '==', this.userData.uid));

    console.log(query);
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
      localStorage.clear();
      this.userData = null;
      this.userProfile = null;
      this.router.navigate(['/']);
    });
  }
}
