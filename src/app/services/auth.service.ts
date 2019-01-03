import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: any;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
          } else {
            this.userDetails = null;
          }
        }
      );
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  getName() {
    if (this.isLoggedIn()) {
      return this.userDetails.displayName;
    }
  }

  getPicture() {
    if (this.isLoggedIn()) {
      return this.userDetails.photoURL;
    }
  }

  getEmail() {
    if (this.isLoggedIn()) {
      return this.userDetails.email;
    }
  }

  logout() {
      this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/dashboard']));
    }
}
