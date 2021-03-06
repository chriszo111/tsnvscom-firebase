import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class SecureAuthPagesGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private alertService: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      this.alertService.triggerAlert('info', `${this.authService.getName().split(' ')[0]}, you are already logged in..`);
      this.router.navigate(['dashboard']);
    }
    return true;
  }
}
