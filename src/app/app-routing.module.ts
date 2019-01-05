import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SecureAuthPagesGuard } from './guards/secure-auth-pages.guard';

import { HomeComponent } from './content/home/home.component';
import { AboutComponent } from './content/about/about.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ContactComponent } from './help/contact/contact.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

export const routes: Routes = [
  {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      component: SignInComponent,
      canActivate: [SecureAuthPagesGuard]
    },
    {
      path: 'register',
      component: SignUpComponent,
      canActivate: [SecureAuthPagesGuard]
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
      canActivate: [SecureAuthPagesGuard]
    },
    {
      path: 'verify-email',
      component: VerifyEmailComponent,
      canActivate: [SecureAuthPagesGuard]
    },
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
